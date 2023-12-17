import { InvoiceSummary } from '../components'
import { NoInvoices } from '../components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IInvoice } from '../redux/slices/invoicesSlice'
import AddIcon from '../assets/plusIcon.png'
import { RootState } from '../redux/store'

function Invoices() {
  const invoices: IInvoice[] = useSelector((state: RootState) => state.invoices)

  return (
    <div className="px-6 py-8 ">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="font-bold">Invoices</div>
          <div className="text-sm text-violet-400">
            {invoices.length === 0
              ? 'No Invoices'
              : `${invoices.length} invoices`}
          </div>
        </div>
        <Link
          className="flex items-center bg-violet-400 text-white font-bold p-2 pr-4 rounded-3xl hover:bg-violet-600"
          to="/invoices/new">
          <span className="bg-white p-3 rounded-full mr-2">
            <img src={AddIcon} alt="" />
          </span>
          New
        </Link>
      </div>
      {invoices.length > 0 ? (
        <div>
          {invoices.map((invoice) => (
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
