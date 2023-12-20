import { IInvoice } from '../redux/slices/invoicesSlice'

interface InvoicesTrackerProps {
  invoices: IInvoice[]
}

function InvoicesTracker({ invoices }: InvoicesTrackerProps) {
  return (
    <div>
      <div className="font-bold">Invoices</div>
      <div className="text-sm text-violet-400">
        {invoices.length === 0 && 'No Invoices'}
        {invoices.length === 1 && `${invoices.length} invoice`}
        {invoices.length > 1 && `${invoices.length} invoices`}
      </div>
    </div>
  )
}

export default InvoicesTracker
