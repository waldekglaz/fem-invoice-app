import { useRouteError } from 'react-router-dom'
import MainImg from '../assets/no-items.png'

function ErrorPage() {
  const error = useRouteError()
  console.error(error)
  return (
    <div className="flex flex-col text-center items-center py-24">
      <img src={MainImg} alt="Ilustration showing no invoices" />
      <h1 className="font-bold text-2xl">You are doing somethong wrong here</h1>
      <p className=" px-12 mt-4 text-violet-400 text-6xl font-bold">404</p>
    </div>
  )
}

export default ErrorPage
