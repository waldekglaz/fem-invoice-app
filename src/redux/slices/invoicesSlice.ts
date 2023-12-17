import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TListItems = {
  name: string
  qty: number
  price: number
  total?: number
}

export interface IInvoice {
  id: string
  name: string
  date: string
  status: 'Paid' | 'Pending'
  description: string
  email: string
  city: string
  street: string
  postcode: string
  country: string
  paymentTerms: number
  currency: string
  items: TListItems[]
}

const initialState: IInvoice[] = [
  // {
  //   id: 'AA0001',
  //   name: 'Johnny B',
  //   date: '11/12/2023',
  //   status: 'Pending',
  //   description: 'Website and batroom tiles',
  //   email: 'johynnyB@gmail.com',
  //   city: 'Tewkesbury',
  //   street: 'St Johns',
  //   postcode: 'GL53 5AF',
  //   country: 'United Kingdom',
  //   paymentTerms: 14,
  //   currency: '$',
  //   items: [
  //     { name: 'website development', qty: 2, price: 999 },
  //     { name: 'email design', qty: 1, price: 299 },
  //   ],
  // },
]

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    addInvoice: (state, action: PayloadAction<IInvoice>) => {
      state.push(action.payload)
    },
    editInvoice: (
      state,
      action: PayloadAction<{ id: string; updatedInvoice: IInvoice }>,
    ) => {
      const { id, updatedInvoice } = action.payload
      const index = state.findIndex((invoice) => invoice.id === id)
      if (index !== -1) {
        state[index] = updatedInvoice
      }
    },
    deleteInvoice: (state, action: PayloadAction<string>) => {
      return state.filter((invoice) => invoice.id !== action.payload)
    },
    markAsPaid: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const index = state.findIndex((invoice) => invoice.id === id)
      if (index !== -1) {
        state[index] = { ...state[index], status: 'Paid' }
      }
    },
  },
})

export const { addInvoice, editInvoice, deleteInvoice, markAsPaid } =
  invoicesSlice.actions

export default invoicesSlice.reducer
