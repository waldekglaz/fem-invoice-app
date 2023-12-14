import { useState, useContext } from 'react'
import { InvoiceSummary } from '../components'
import { NoInvoices } from '../components'
import { Link } from 'react-router-dom'
import { InvoiceSummaryProps } from '../components/InvoiceSummary'
import { useSelector } from 'react-redux'

function Invoices() {
  const invoices = useSelector((state) => state.invoices)

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
        <Link to="/invoices/new">New</Link>
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
