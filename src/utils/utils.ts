import { IInvoice } from '../redux/slices/invoicesSlice'

export function generateInvoiceNumber(existingInvoices: IInvoice[]) {
  let currentId = 1

  // Find the maximum existing invoice ID
  if (existingInvoices && existingInvoices.length > 0) {
    const maxId = existingInvoices.reduce((max: number, invoice: IInvoice) => {
      const idNumber = parseInt(invoice.id.slice(2), 10)
      return idNumber > max ? idNumber : max
    }, 0)

    currentId = maxId + 1
  }

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const firstPart =
    letters[Math.floor((currentId - 1) / 9999)] +
    letters[Math.floor((currentId - 1) / (26 * 9999)) % 26]
  const secondPart = ('0000' + (currentId % 10000)).slice(-4)
  const invoiceNumber = `${firstPart}${secondPart}`

  return invoiceNumber
}

export function formattedDate(date: string): string {
  const newDate = new Date(date)
  const day = newDate.getDate().toString().padStart(2, '0')
  const month = newDate.toLocaleString('default', { month: 'short' })
  const year = newDate.getFullYear()

  return `${day} ${month} ${year}`
}

export function calculateDueDate(date: string, term: number): string {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + +term)

  // date format
  const day = newDate.getDate().toString().padStart(2, '0')
  const month = newDate.toLocaleString('default', { month: 'short' })
  const year = newDate.getFullYear()

  return `${day} ${month} ${year}`
}

// Generate todays date

export function todaysDate(date: Date): string {
  const newDate = new Date(date)
  const day = String(newDate.getDate()).padStart(2, '0')
  const month = String(newDate.getMonth() + 1).padStart(2, '0') // Month is zero-based
  const year = newDate.getFullYear()

  return `${year}-${month}-${day}`
}
