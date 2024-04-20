import MainImg from '../assets/no-items.png'

function NoInvoices() {
  return (
    <div className="flex flex-col text-center items-center py-24">
      <img src={MainImg} alt="Ilustration showing no invoices" />
      <h1 className="font-bold text-2xl">There is nothing here</h1>
      <p className="text-xs px-12 mt-4 text-violet-400">
        Create an invoice by clicking the <strong>New</strong> button and get
        started
      </p>
    </div>
  )
}

export default NoInvoices
