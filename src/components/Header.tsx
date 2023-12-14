import Logo from '../assets/invoices-logo.png'
import Avatar from '../assets/avatar.png'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-slate-600 flex items-center justify-between">
      <Link to="/">
        <img src={Logo} alt="invoice app logo" />
      </Link>

      <div>
        <img
          src={Avatar}
          alt="invoice app logo"
          className="px-6 border-l-[2px] border-slate-500"
        />
      </div>
    </header>
  )
}

export default Header
