import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import {
  Root,
  Home,
  Invoices,
  InvoiceDetails,
  InvoiceEdit,
  NewInvoice,
  ErrorPage,
} from './pages'
import { Provider } from 'react-redux'
import store from './redux/store'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/invoices',
        element: <Invoices />,
      },
      { path: '/invoices/:id', element: <InvoiceDetails /> },
      { path: '/invoices/new', element: <NewInvoice /> },
      { path: '/invoices/edit/:id', element: <InvoiceEdit /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
