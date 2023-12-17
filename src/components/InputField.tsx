import { ReactNode } from 'react'

type InputFieldProps = {
  label: string
  children: ReactNode
  name: string
}

function InputField({ label, name, children }: InputFieldProps) {
  return (
    <p className="flex flex-col mb-4 ">
      <label className="text-slate-600 text-sm mb-2" htmlFor={name}>
        {label}
      </label>
      {children}
    </p>
  )
}

export default InputField
