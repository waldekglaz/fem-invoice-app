import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { deleteInvoice, markAsPaid } from '../redux/slices/invoicesSlice'
import { IInvoice, TListItems } from '../redux/slices/invoicesSlice'
import { Button, Modal } from '../components'
import { RootState } from '../redux/store'
import { formattedDate } from '../utils/utils'
import { toast } from 'react-toastify'
import MainImg from '../assets/no-items.png'

function InvoiceDetails() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const invoices: IInvoice[] = useSelector((state: RootState) => state.invoices)
  const { id } = useParams()
  if (!id) {
    return <div>Invoice ID is missing</div>
  }

  const handleInvoiceDelete = (id: string) => {
    dispatch(deleteInvoice(id))
    navigate('/invoices')
    toast.warning('Invoice Deleted!')
  }
  const handleMarkAsPaid = (id: string) => {
    dispatch(markAsPaid(id))
    toast.success('Marked as Paid!')
  }

  const invoiceData = invoices.find((invoice: IInvoice) => invoice.id === id)
  if (!invoiceData) {
    return (
      <div className="flex flex-col text-center items-center py-24">
        <img src={MainImg} alt="Ilustration showing no invoices" />
        <h1 className="font-bold text-2xl">There is nothing here</h1>
        <p className="text-xs px-12 mt-4 text-violet-400">
          Click{' '}
          <Link className="font-bold" to="/invoices">
            Here
          </Link>{' '}
          to go back to invoices
        </p>
      </div>
    )
  }
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
    currency,
    items,
    dueDate,
  } = invoiceData

  const grandTotal = items.reduce((sum: number, item: TListItems) => {
    return sum + +item.qty * +item.price
  }, 0)

  return (
    <>
      <div className="px-6 pt-8 md:px-28 lg:px-96">
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
          <h1 className="text-violet-400">
            #<span className="font-bold text-black">{invoiceData.id}</span>
          </h1>
          <p className="mb-8 text-violet-400">{description}</p>
          <address className="text-violet-400 not-italic mb-8">
            19 Union Street
            <br />
            London
            <br />
            E1 3EZ
            <br />
            United Kingdom
          </address>
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-8">
                <p className="text-violet-400 mb-4">Invoice Date</p>
                <p className="font-bold text-lg">{formattedDate(date)}</p>
              </div>
              <div>
                <p className="text-violet-400 mb-4">Payment Date</p>
                <p className="font-bold text-lg">{dueDate}</p>
              </div>
            </div>
            <div>
              <p className="text-violet-400 mb-4">Bill To</p>
              <address className="not-italic text-violet-400">
                <p className="font-bold text-lg text-black">{name}</p>
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
          <div className="mb-9">
            <p className="text-violet-400 mb-4">Sent to</p>
            <p className="font-bold text-lg text-black">{email}</p>
          </div>
          <div className="bg-slate-100 rounded-t-lg">
            {items.map((item: TListItems) => (
              <div
                key={item.name}
                className="flex items-center p-6 font-bold justify-between ">
                <div className="md:flex basis-2/4 justify-between">
                  <p className="text-black ">{item.name}</p>
                  <p className="text-violet-400">
                    {item.qty} x {currency} {item.price}
                  </p>
                </div>

                <p>
                  {currency} {+item.qty * +item.price}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between bg-slate-800 p-6 text-slate-50 rounded-b-lg">
            <p>Grand Total</p>
            <p className="text-4xl font-bold">
              {currency} {grandTotal}
            </p>
          </div>
        </div>
        <div className="flex justify-between md:justify-center md:gap-4 bg-white px-2 py-3">
          <Button role="edit" text="Edit" link={`/invoices/edit/${id}`} />
          <Button
            role="delete"
            onClick={() => setIsModalOpen(true)}
            text="Delete"
          />

          {status !== 'Paid' && (
            <Button
              role="asPaid"
              text="Mark as Paid"
              onClick={() => handleMarkAsPaid(id)}
            />
          )}
        </div>
      </div>
      {isModalOpen && (
        <Modal
          onDelete={() => handleInvoiceDelete(id)}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

export default InvoiceDetails
