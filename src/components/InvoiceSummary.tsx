import { TListItems } from '../redux/slices/invoicesSlice'

export type InvoiceSummaryProps = {
  id: string
  name: string
  date: string
  status: 'Paid' | 'Pending'
  currency: string
  items: TListItems[]
}

function InvoiceSummary({
  id,
  name,
  date,
  status,
  currency,
  items,
}: InvoiceSummaryProps) {
  const grandTotal = items.reduce((sum: number, item) => {
    return sum + item.qty * item.price
  }, 0)
  return (
    <div className="bg-white rounded-lg p-6 mb-4 md:flex md:items-center md:justify-evenly">
      <div className="flex justify-between items-center">
        <div className="font-bold text-sky-950 md:mr-6">
          <span className="text-violet-400">#</span>
          {id}
        </div>
        <div className="text-sm text-violet-400 md:mr-14">{name}</div>
      </div>
      <div className="mt-6 flex justify-between items-center md:mt-0 ">
        <div className="md:flex md:items-center">
          <div className="text-sm text-violet-400 md:mr-20">Due {date}</div>
          <div className="font-bold text-sky-950 mt-2 md:mt-0 md:mr-10">
            {currency} {grandTotal}
          </div>
        </div>
        <div
          className={`font-bold px-7 py-3 rounded-md ${
            status === 'Paid'
              ? 'text-green-500 bg-green-100'
              : 'text-orange-500 bg-orange-100'
          }`}>
          {status}
        </div>
      </div>
    </div>
  )
}

export default InvoiceSummary
