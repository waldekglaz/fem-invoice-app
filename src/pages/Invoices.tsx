import { InvoiceSummary } from '../components'
import { NoInvoices, InvoicesTracker } from '../components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IInvoice } from '../redux/slices/invoicesSlice'
import AddIcon from '../assets/plusIcon.png'
import { RootState } from '../redux/store'
import { useState, ChangeEvent } from 'react'

function Invoices() {
  const invoices: IInvoice[] = useSelector((state: RootState) => state.invoices)
  const [invoicesToShow, setInvoicesToShow] = useState(invoices)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    setSearchTerm(value)
    const filteredItems = invoices.filter((invoice) =>
      invoice.name.toLowerCase().includes(value),
    )
    setInvoicesToShow(filteredItems)
  }
  return (
    <div className="px-6 py-8 md:px-28 lg:px-96">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <InvoicesTracker invoices={invoicesToShow} />

        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e)}
          className="px-4 py-2"
        />
        <Link
          className="flex items-center bg-violet-400 text-white font-bold p-2 pr-4 rounded-3xl hover:bg-violet-600"
          to="/invoices/new">
          <span className="bg-white p-3 rounded-full mr-2">
            <img src={AddIcon} alt="" />
          </span>
          New
        </Link>
      </div>
      {invoicesToShow.length > 0 ? (
        <div>
          {invoicesToShow.map((invoice) => (
            <Link to={`/invoices/${invoice.id}`} key={invoice.id}>
              <InvoiceSummary {...invoice} />
            </Link>
          ))}
        </div>
      ) : (
        <NoInvoices />
      )}
    </div>
  )
}

export default Invoices
