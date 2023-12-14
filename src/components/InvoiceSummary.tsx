export type InvoiceSummaryProps = {
  id: string
  name: string
  date: string
  total: number
  status: 'Paid' | 'Pending'
}

function InvoiceSummary({
  id,
  name,
  date,
  total,
  status,
}: InvoiceSummaryProps) {
  return (
    <div className="bg-white rounded-lg p-6 mb-4">
      <div className="flex justify-between items-center">
        <div className="font-bold text-sky-950">
          <span className="text-violet-400">#</span>
          {id}
        </div>
        <div className="text-sm text-violet-400">{name}</div>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div>
          <div className="text-sm text-violet-400">Due {date}</div>
          <div className="font-bold text-sky-950 mt-2">$ {total}</div>
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
