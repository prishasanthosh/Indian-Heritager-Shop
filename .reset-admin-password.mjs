import readline from 'node:readline'
import { Pool } from 'pg'
import { config as loadEnv } from 'dotenv'
import { hashPassword } from 'better-auth/crypto'

const ADMIN_EMAIL = 'prishasanthosh1@gmail.com'

loadEnv({ path: '.env.local', quiet: true })

if (!process.env.DATABASE_URL?.trim()) {
  throw new Error('DATABASE_URL is missing from .env.local or the environment.')
}

function ask(question) {
  const input = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    input.question(question, (answer) => {
      input.close()
      resolve(answer.trim())
    })
  })
}

async function askHidden(question) {
  process.stdout.write(question)
  return new Promise((resolve, reject) => {
    let value = ''
    const stdin = process.stdin
    if (!stdin.isTTY) {
      reject(new Error('Hidden password input requires an interactive PowerShell terminal.'))
      return
    }

    stdin.setRawMode(true)
    stdin.resume()
    stdin.setEncoding('utf8')

    const cleanup = () => {
      stdin.setRawMode(false)
      stdin.pause()
      stdin.removeListener('data', onData)
    }
    const onData = (character) => {
      if (character === '\u0003') {
        cleanup()
        process.stdout.write('\n')
        reject(new Error('Password reset cancelled.'))
      } else if (character === '\r' || character === '\n') {
        cleanup()
        process.stdout.write('\n')
        resolve(value)
      } else if (character === '\u007f' || character === '\b') {
        value = value.slice(0, -1)
      } else if (!/[\u0000-\u001f\u007f]/.test(character)) {
        value += character
      }
    }

    stdin.on('data', onData)
  })
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

try {
  const lookup = await pool.query(
    `SELECT u.id AS "userId", a.id AS "accountId"
       FROM "user" u
       JOIN account a ON a."userId" = u.id
      WHERE lower(u.email) = lower($1) AND a."providerId" = 'credential'
      LIMIT 2`,
    [ADMIN_EMAIL],
  )

  if (lookup.rowCount !== 1) {
    throw new Error(`Expected exactly one credential account for ${ADMIN_EMAIL}; found ${lookup.rowCount ?? 0}. No update was made.`)
  }

  const { userId, accountId } = lookup.rows[0]
  const confirmation = await ask(`Type RESET for ${ADMIN_EMAIL} to continue: `)
  if (confirmation !== 'RESET') {
    console.log('Cancelled. No database update was made.')
    process.exitCode = 0
  } else {
    const password = await askHidden('New admin password: ')
    const confirmationPassword = await askHidden('Confirm new admin password: ')

    if (!password || password.length < 8) {
      throw new Error('The new password must contain at least 8 characters. No update was made.')
    }
    if (password !== confirmationPassword) {
      throw new Error('Passwords did not match. No update was made.')
    }

    const passwordHash = await hashPassword(password)
    if (!passwordHash || passwordHash.includes('\n')) {
      throw new Error('Better Auth did not produce a valid password hash. No update was made.')
    }

    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const result = await client.query(
        `UPDATE account
            SET password = $1, "updatedAt" = now()
          WHERE id = $2 AND "userId" = $3 AND "providerId" = 'credential'`,
        [passwordHash, accountId, userId],
      )
      if (result.rowCount !== 1) {
        await client.query('ROLLBACK')
        throw new Error('The credential account changed during the reset. No update was made.')
      }
      await client.query('COMMIT')
      console.log('Admin credential password updated successfully.')
    } catch (error) {
      await client.query('ROLLBACK').catch(() => {})
      throw error
    } finally {
      client.release()
    }
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Password reset failed.')
  process.exitCode = 1
} finally {
  await pool.end()
}
