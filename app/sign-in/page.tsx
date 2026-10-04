import Link from 'next/link'
import { AuthForm } from '@/components/auth-form'

export default function SignInPage() {
  return (
    <main className="grid min-h-[60vh] place-items-center overflow-x-clip bg-[#f8f5ee] px-4 py-10 sm:px-6 sm:py-14">
      <div className="w-full max-w-md space-y-5 bg-[#fbfaf6] p-5 shadow-sm sm:space-y-6 sm:p-8">
        <AuthForm mode="sign-in" />
        <p className="text-sm text-[#59645f]">New to Indian Heritager? <Link className="font-bold text-[#c26742]" href="/sign-up">Create an account</Link></p>
        <Link href="/" className="text-sm font-bold text-[#071b2b]">← Back to shop</Link>
      </div>
    </main>
  )
}
