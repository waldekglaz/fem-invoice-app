import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TListItems = {
  name: string
  qty: number
  price: number
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

// Load state from local storage or initial state

const loadState = (): IInvoice[] => {
  try {
    const savedState = localStorage.getItem('invoices')
    return savedState ? JSON.parse(savedState) : []
  } catch (err) {
    console.error('Error loading state from local storage', err)
    return []
  }
}

// Save state to local storage

const saveState = (state: IInvoice[]): void => {
  try {
    const stateToSave = JSON.stringify(state)
    localStorage.setItem('invoices', stateToSave)
  } catch (err) {
    console.error('Error saving state to local storage', err)
  }
}

// const initialState: IInvoice[] = [
//   {
//     id: 'AA0001',
//     name: 'Johnny B',
//     date: '11/12/2023',
//     status: 'Pending',
//     description: 'Website and batroom tiles',
//     email: 'johynnyB@gmail.com',
//     city: 'Tewkesbury',
//     street: 'St Johns',
//     postcode: 'GL53 5AF',
//     country: 'United Kingdom',
//     paymentTerms: 14,
//     currency: '$',
//     items: [
//       { name: 'website development', qty: 2, price: 999 },
//       { name: 'email design', qty: 1, price: 299 },
//     ],
//   },
// ]

// const initialState = loadState()

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: loadState(),
  reducers: {
    addInvoice: (state, action: PayloadAction<IInvoice>) => {
      state.push(action.payload)
      saveState(state)
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
      saveState(state)
    },
    deleteInvoice: (state, action: PayloadAction<string>) => {
      const newState = state.filter((invoice) => invoice.id !== action.payload)
      saveState(newState)
      return newState
    },
    markAsPaid: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const index = state.findIndex((invoice) => invoice.id === id)
      if (index !== -1) {
        state[index] = { ...state[index], status: 'Paid' }
      }
      saveState(state)
    },
  },
})

export const { addInvoice, editInvoice, deleteInvoice, markAsPaid } =
  invoicesSlice.actions

export default invoicesSlice.reducer
