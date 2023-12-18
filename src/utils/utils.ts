export function generateInvoiceNumber(existingInvoices) {
  let currentId = 1

  // Find the maximum existing invoice ID
  if (existingInvoices && existingInvoices.length > 0) {
    const maxId = existingInvoices.reduce((max, invoice) => {
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
