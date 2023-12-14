import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { deleteInvoice, markAsPaid } from '../redux/slices/invoicesSlice'

function InvoiceDetails() {
  const invoices = useSelector((state) => state.invoices)
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInvoiceDelete = (id) => {
    dispatch(deleteInvoice(id))
    navigate('/invoices')
  }
  const handleMarkAsPaid = (id) => {
    dispatch(markAsPaid(id))
    navigate('/invoices')
  }

  const invoiceData = invoices.find((invoice) => invoice.id === id)
  const {
    status,
    description,
    date,
    name,
    street,
    city,
    postcode,
    country,
    email,
    total,
  } = invoiceData
  console.log(invoiceData)
  return (
    <div className="px-6 py-8 ">
      <Link to="/invoices" className="flex gap-6 items-center font-bold">
        <span className="text-violet-400 ">&lt;</span>Go back
      </Link>
      <div className="flex items-center justify-between p-6 bg-white mt-8">
        <div className="text-sm text-violet-400">Status</div>
        <div
          className={`font-bold px-7 py-3 rounded-md ${
            status === 'Paid'
              ? 'text-green-500 bg-green-100'
              : 'text-orange-500 bg-orange-100'
          }`}>
          {status}
        </div>
      </div>
      <div className="p-6">
        <h1>#{invoiceData.id}</h1>
        <p className="mb-8">{description}</p>
        <address>
          19 Union Street
          <br />
          London
          <br />
          E1 3EZ
          <br />
          United Kingdom
        </address>
        <div>
          <div>
            <div>
              <p>Invoice Date</p>
              <p>{date}</p>
            </div>
            <div>
              <p>Payment Date</p>
              <p>{date}</p>
            </div>
          </div>
          <div>
            <p>Bill To</p>
            <address>
              {name}
              <br />
              {street}
              <br />
              {city}
              <br />
              {postcode}
              <br />
              {country}
            </address>
          </div>
        </div>
        <div>
          <p>Sent to</p>
          <p>{email}</p>
        </div>
        <div>
          <p>Grand Total</p>
          <p>{total}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <Link to={`/invoices/edit/${id}`}>Edit</Link>
        <button onClick={() => handleInvoiceDelete(id)}>Delete</button>
        {status !== 'Paid' && (
          <button onClick={() => handleMarkAsPaid(id)}>Mark as Paid</button>
        )}
      </div>
    </div>
  )
}

export default InvoiceDetails
