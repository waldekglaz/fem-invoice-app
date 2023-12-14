import { Outlet } from 'react-router-dom'
import { Header } from '../components'
function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Root
