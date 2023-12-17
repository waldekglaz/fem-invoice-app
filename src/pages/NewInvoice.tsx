import { Link, useNavigate } from 'react-router-dom'
import { addInvoice } from '../redux/slices/invoicesSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { IInvoice } from '../redux/slices/invoicesSlice'

function NewInvoice() {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const [items, setItems] = useState([{ name: '', qty: 1, price: '' }])

  const onSubmit = ({
    name,
    date,
    street,
    email,
    country,
    postcode,
    city,
    currency,
    description,
  }: IInvoice) => {
    const newInvoice = {
      id: 'aa00001',
      name,
      date,
      status: 'Pending',
      street,
      email,
      country,
      postcode,
      city,
      currency,
      description,
      items: items,
    }
    console.log(date)
    dispatch(addInvoice(newInvoice))
    navigate('/invoices')
  }

  const handleAddItem = () => {
    setItems([...items, { name: '', qty: 1, price: '' }])
    console.log(items)
  }

  const handleDeleteItem = (index) => {
    const updatedItems = [...items]
    updatedItems.splice(index, 1)
    setItems(updatedItems)
  }

  return (
    <div className="px-6 py-8 ">
      <Link to="/invoices" className="flex gap-6 items-center font-bold">
        <span className="text-violet-400 ">&lt;</span>Go back
      </Link>
      <h1 className="font-bold mt-6 mb-5 text-lg">New Invoice</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-violet-600 mb-6 ">Bill to</div>
        <p className="flex flex-col mb-4 ">
          <label className="text-slate-600 text-sm mb-2" htmlFor="name">
            Client's Name
          </label>
          <input
            type="text"
            {...register('name')}
            className=" px-4 py-2 border border-slate-300"
          />
        </p>
        <p className="flex flex-col mb-4">
          <label htmlFor="email" className="text-slate-600 text-sm mb-2">
            Client's Email
          </label>
          <input
            type="email"
            {...register('email')}
            className=" px-4 py-2 border border-slate-300"
          />
        </p>
        <p className="flex flex-col mb-4">
          <label htmlFor="street" className="text-slate-600 text-sm mb-2">
            Street Address
          </label>
          <input
            type="email"
            {...register('street')}
            className=" px-4 py-2 border border-slate-300"
          />
        </p>
        <div className="flex justify-between gap-4 mb-4">
          <p className="basis-2/4">
            <label htmlFor="city" className="text-slate-600  text-sm mb-2">
              City
            </label>
            <input
              type="text"
              {...register('city')}
              className=" px-4 py-2 border border-slate-300 w-full"
            />
          </p>
          <p className="basis-2/4">
            <label htmlFor="postcode" className="text-slate-600 text-sm mb-2">
              Post Code
            </label>
            <input
              type="text"
              {...register('postcode')}
              className=" px-4 py-2 border border-slate-300 w-full"
            />
          </p>
        </div>

        <p className="flex flex-col mb-4">
          <label htmlFor="country" className="border-slate-300 text-sm mb-2">
            Country
          </label>
          <input
            type="text"
            {...register('country')}
            className="px-4 py-2 border border-slate-300 w-full"
          />
        </p>
        <p className="flex flex-col mb-4">
          <label htmlFor="date" className="text-slate-600 text-sm mb-2">
            Invoice Date
          </label>
          <input
            type="date"
            {...register('date')}
            className="px-4 py-2 border border-slate-300 w-full"
          />
        </p>
        <p className="flex flex-col mb-4">
          <label htmlFor="paymentTerms" className="text-slate-600 text-sm mb-2">
            Payment Terms
          </label>
          <select
            {...register('paymentTerms')}
            className="text-slate-600 text-sm mb-2 px-4 py-2 border border-slate-300">
            <option value="1">Net 1 Day</option>
            <option value="7">Net 7 Days</option>
            <option value="14">Net 14 Days</option>
            <option value="30">Net 30 Days</option>
          </select>
        </p>
        <p className="flex flex-col mb-4">
          <label htmlFor="description" className="text-slate-600 text-sm mb-2">
            Project Description
          </label>
          <input
            type="text"
            {...register('description')}
            className="px-4 py-2 border border-slate-300 w-full"
          />
        </p>
        <div>
          <h2>Items List</h2>
          {items.map((item, index) => (
            <div
              key={`${index}-item`}
              id={`item-${index}`}
              className="list-item">
              <div>
                <label htmlFor={`item-name-${index}`}>Item Name</label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => {
                    const newItems = [...items]
                    newItems[index] = { ...item, name: e.target.value }
                    setItems(newItems)
                  }}
                />
              </div>
              <div>
                <label htmlFor={`item-name-${index}`}>Qty.</label>
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) => {
                    const newItems = [...items]
                    newItems[index] = { ...item, qty: +e.target.value }
                    setItems(newItems)
                  }}
                />
              </div>
              <div>
                <label htmlFor={`item-name-${index}`}>Price</label>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => {
                    const newItems = [...items]
                    newItems[index] = { ...item, price: +e.target.value }
                    setItems(newItems)
                  }}
                />
              </div>
              <div>
                <label htmlFor="total">Total</label>
                <input type="number" disabled value={item.qty * item.price} />
              </div>
              <button type="button" onClick={() => handleDeleteItem(index)}>
                Delete Item
              </button>
            </div>
          ))}

          <button type="button" onClick={handleAddItem}>
            Add Item
          </button>
        </div>

        <p className="flex flex-col mb-4">
          <label htmlFor="invoiceDate" className="text-slate-600 text-sm mb-2">
            Total Price
          </label>
          <input
            type="number"
            {...register('total')}
            className="px-4 py-2 border border-slate-300 w-full"
          />
        </p>
        <p className="flex flex-col mb-4">
          <label htmlFor="invoiceDate" className="text-slate-600 text-sm mb-2">
            Currency
          </label>
          <input
            type="string"
            {...register('currency')}
            className="px-4 py-2 border border-slate-300 w-full"
          />
        </p>
      </form>
      <button onClick={handleSubmit(onSubmit)}>Add Invoice</button>
    </div>
  )
}

export default NewInvoice
