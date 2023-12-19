import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TListItems = {
  name: string
  qty: string
  price: string
}

export interface IInvoice {
  id: string
  name: string
  date: string
  dueDate: string
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
