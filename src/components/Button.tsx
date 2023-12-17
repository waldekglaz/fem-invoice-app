import React from 'react'
import { Link } from 'react-router-dom'

type TLink = {
  text: string
  role: 'edit'
  link: string
}
type TButton = {
  text: string
  role: 'delete' | 'asPaid'
  onClick: () => void
}

function Button({ text, role, onClick, link }: TButton | TLink) {
  if (role === 'edit') {
    return (
      <Link
        className="bg-slate-100 text-slate-800 font-bold px-4 py-3 rounded-3xl hover:bg-slate-400"
        to={link}>
        {text}
      </Link>
    )
  }
  return (
    <button
      className={`font-bold px-4 py-3 rounded-3xl ${
        role === 'delete'
          ? 'bg-red-500 text-white hover:bg-red-800'
          : 'bg-violet-700 text-white hover:bg-violet-800'
      }`}
      onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
