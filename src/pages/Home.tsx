import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="text-center py-32">
      <h2 className="text-sm">Frontend Mentor</h2>
      <h1 className="text-4xl font-bold">Invoice App</h1>
      <p className="mt-4 mb-8">
        This invoicing app project will test you on many levels. You'll be
        working with JSON data, managing state, plus a lot more.{' '}
      </p>
      <Link
        className="bg-slate-600 text-slate-50 px-4 py-2 rounded-md"
        to="/invoices">
        Get Started
      </Link>
    </div>
  )
}

export default Home
