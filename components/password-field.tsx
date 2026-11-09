'use client'

import { useId, useState, type InputHTMLAttributes } from 'react'

type PasswordFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  inputClassName?: string
}

export function PasswordField({ inputClassName, ...props }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)
  const generatedId = useId()
  const id = props.id ?? generatedId

  return (
    <span className="relative block">
      <input
        {...props}
        id={id}
        type={visible ? 'text' : 'password'}
        className={`${inputClassName ?? ''} pr-16`}
      />
      <button
        type="button"
        aria-controls={id}
        aria-pressed={visible}
        onClick={(event) => {
          event.preventDefault()
          setVisible((current) => !current)
        }}
        className="absolute inset-y-0 right-3 my-auto h-fit text-sm font-semibold text-[#702d32] hover:underline"
      >
        {visible ? 'Hide' : 'Show'}
      </button>
    </span>
  )
}
