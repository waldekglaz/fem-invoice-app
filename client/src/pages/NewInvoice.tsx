import { Link, useNavigate } from 'react-router-dom'
import { addInvoice } from '../redux/slices/invoicesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { IInvoice } from '../redux/slices/invoicesSlice'
import TrashIcon from '../assets/trash.png'
import { Button, InputField } from '../components'
import {
  generateInvoiceNumber,
  calculateDueDate,
  todaysDate,
} from '../utils/utils'
import { RootState } from '../redux/store'
import { toast } from 'react-toastify'

function NewInvoice() {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInvoice>()
  const navigate = useNavigate()

  const invoices = useSelector((state: RootState) => state.invoices)

  const [items, setItems] = useState([{ name: '', qty: '1', price: '' }])

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
    paymentTerms,
  }: IInvoice) => {
    const newInvoice: IInvoice = {
      id: generateInvoiceNumber(invoices),
      name,
      date,
      dueDate: calculateDueDate(date, paymentTerms),
      status: 'Pending',
      street,
      email,
      country,
      postcode,
      city,
      currency,
      description,
      paymentTerms,
      items: items,
    }

    dispatch(addInvoice(newInvoice))
    navigate('/')
    toast.success('Invoice Created!')
  }

  const handleAddItem = () => {
    setItems([...items, { name: '', qty: '1', price: '' }])
  }

  const handleDeleteItem = (index: number) => {
    const updatedItems = [...items]
    updatedItems.splice(index, 1)
    setItems(updatedItems)
  }

  return (
    <div className="px-6 py-8 md:px-28 lg:px-96">
      <Link to="/" className="flex gap-6 items-center font-bold">
        <span className="text-violet-400 ">&lt;</span>Go back
      </Link>
      <h1 className="font-bold mt-6 mb-5 text-lg">New Invoice</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-violet-600 mb-6 ">Bill to</div>
        <InputField label="Client's Name" name="name">
          <input
            type="text"
            {...register('name', {
              required: "Client's name is required",
            })}
            className=" px-4 py-2 border border-slate-300"
          />
          {errors && (
            <span className="text-red-500">{errors.name?.message}</span>
          )}
        </InputField>
        <InputField label="Client's Email" name="email">
          <input
            type="email"
            {...register('email', {
              required: "Client's email is required",
            })}
            className=" px-4 py-2 border border-slate-300"
          />
          {errors && (
            <span className="text-red-500">{errors.email?.message}</span>
          )}
        </InputField>
        <InputField label="Street Address" name="street">
          <input
            type="email"
            {...register('street', {
              required: "Client's street address is required",
            })}
            className=" px-4 py-2 border border-slate-300"
          />
          {errors && (
            <span className="text-red-500">{errors.street?.message}</span>
          )}
        </InputField>

        <div className="flex justify-between gap-4 mb-4">
          <InputField pClassName="basis-2/4" name="city" label=" City">
            <input
              type="text"
              {...register('city', {
                required: "Client's city address is required",
              })}
              className=" px-4 py-2 border border-slate-300 w-full"
            />
            {errors && (
              <span className="text-red-500">{errors.city?.message}</span>
            )}
          </InputField>
          <InputField pClassName="basis-2/4" name="postcode" label="Post Code">
            <input
              type="text"
              {...register('postcode', {
                required: "Client's city address is required",
              })}
              className=" px-4 py-2 border border-slate-300 w-full"
            />
            {errors && (
              <span className="text-red-500">{errors.postcode?.message}</span>
            )}
          </InputField>
        </div>
        <InputField name="country" label="Country">
          <input
            type="text"
            {...register('country')}
            className="px-4 py-2 border border-slate-300 w-full"
          />
        </InputField>
        <InputField label="Invoice Date" name="date">
          <input
            type="date"
            {...register('date')}
            defaultValue={todaysDate(new Date())}
            className="px-4 py-2 border border-slate-300 w-full"
          />
        </InputField>
        <InputField name="paymentTerms" label="Payment Terms">
          <select
            {...register('paymentTerms')}
            className="text-slate-600 text-sm mb-2 px-4 py-2 border border-slate-300">
            <option value="1">Net 1 Day</option>
            <option value="7">Net 7 Days</option>
            <option value="14">Net 14 Days</option>
            <option value="30">Net 30 Days</option>
          </select>
        </InputField>
        <InputField name="description" label="Project Description">
          <textarea
            {...register('description')}
            className="px-4 py-2 border border-slate-300 w-full"
          />
        </InputField>

        <div>
          <h2 className="text-2xl font-bold mb-4">Items List</h2>
          {items.map((item, index) => (
            <div
              key={`${index}-item`}
              id={`item-${index}`}
              className="list-item list-none md:flex md:justify-start md:items-center">
              <InputField
                name={`item-name-${index}`}
                label="Item Name"
                pClassName="md:mr-4">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => {
                    const newItems = [...items]
                    newItems[index] = { ...item, name: e.target.value }
                    setItems(newItems)
                  }}
                  className="px-4 py-2 border border-slate-300 w-full"
                />
              </InputField>

              <div className="flex items-center justify-between ">
                <InputField
                  name={`item-qty-${index}`}
                  label="Qty."
                  pClassName="mr-4">
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => {
                      const newItems = [...items]
                      newItems[index] = { ...item, qty: e.target.value }
                      setItems(newItems)
                    }}
                    className="px-4 py-2 border border-slate-300 w-14"
                  />
                </InputField>
                <InputField
                  name={`item-price-${index}`}
                  label="Price"
                  pClassName="md:mr-4">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => {
                      const newItems = [...items]
                      newItems[index] = { ...item, price: e.target.value }
                      setItems(newItems)
                    }}
                    className="px-4 py-2 border border-slate-300 w-[100px] mr-2 md:w-[220px]"
                  />
                </InputField>

                <p className="flex flex-col mb-4 md:mr-10">
                  {' '}
                  <label
                    className="text-slate-600 text-sm mb-2 "
                    htmlFor="total">
                    Total
                  </label>
                  <input
                    className="px-4 py-2 border border-slate-300 w-18"
                    type="text"
                    disabled
                    value={+item.qty * +item.price}
                  />
                </p>
                <button type="button" onClick={() => handleDeleteItem(index)}>
                  <img
                    src={TrashIcon}
                    alt="bin icon"
                    className="w-[14px] mt-5"
                  />
                </button>
              </div>
              <div></div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddItem}
            className="bg-slate-100 text-slate-500 font-bold w-full py-4 rounded-3xl mt-12 hover:bg-slate-200">
            + Add New Item
          </button>
        </div>
        <InputField name="currency" label="Currency">
          <input
            type="string"
            {...register('currency', {
              required: 'Currency is required',
            })}
            className="px-4 py-2 border border-slate-300 w-full"
          />
          {errors && (
            <span className="text-red-500">{errors.currency?.message}</span>
          )}
        </InputField>
      </form>
      <Button
        text="Add Invoice"
        role="other"
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  )
}

export default NewInvoice
