import { Link } from 'react-router-dom'

type TLink = {
  text: string
  role: 'edit' | 'other'
  link: string
  onClick?: never
}
type TButton = {
  text: string
  role: 'delete' | 'asPaid' | 'other'
  link?: never
  onClick: () => void
}

function Button({ text, role, onClick, link }: TButton | TLink) {
  if (role === 'edit') {
    return (
      <Link
        className="bg-slate-100 text-slate-800 font-bold px-2 py-3 rounded-3xl hover:bg-slate-400 md:px-6"
        to={link}>
        {text}
      </Link>
    )
  }
  return (
    <button
      className={`font-bold px-2 py-3 rounded-3xl md:px-6 ${
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
