import { ReactNode } from 'react'

type InputFieldProps = {
  label: string
  children: ReactNode
  name: string
  pClassName?: string
  lClassName?: string
}

function InputField({
  label,
  name,
  children,
  pClassName,
  lClassName,
}: InputFieldProps) {
  return (
    <p className={`flex flex-col mb-4 ${pClassName ? pClassName : ''}`}>
      <label
        className={`text-slate-600 text-sm mb-2 ${
          lClassName ? lClassName : ''
        }`}
        htmlFor={name}>
        {label}
      </label>
      {children}
    </p>
  )
}

export default InputField
