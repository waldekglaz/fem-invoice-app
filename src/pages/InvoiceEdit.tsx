import React from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { editInvoice } from '../redux/slices/invoicesSlice'
import { useDispatch, useSelector } from 'react-redux'
import { IInvoice } from '../redux/slices/invoicesSlice'

function InvoiceEdit() {
  const { id } = useParams()
  const invoices = useSelector((state) => state.invoices)
  const editedInvoice = invoices.find((invoice) => invoice.id === id)

  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: editedInvoice,
  })
  const navigate = useNavigate()

  const onSubmit = (data: IInvoice[]) => {
    const updatedInvoice = {
      id,
      ...data,
    }
    dispatch(editInvoice({ id, updatedInvoice }))
    navigate('/invoices')
  }

  return (
    <div className="px-6 py-8 ">
      <Link to="/invoices" className="flex gap-6 items-center font-bold">
        <span className="text-violet-400 ">&lt;</span>Go back
      </Link>
      <h1 className="font-bold mt-6 mb-5 text-lg">Edit #{id}</h1>
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
          <label htmlFor="invoiceDate" className="text-slate-600 text-sm mb-2">
            Invoice Date
          </label>
          <input
            type="date"
            {...register('invoiceDate', { required: true })}
            className="px-4 py-2 border border-slate-300 w-full"
          />
          {errors.name && errors.name.type === 'required' && (
            <span role="alert">This is required</span>
          )}
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
        {/* <h2 className="text-slate-600 font-bold mb-5">Item List</h2> */}

        {/* <div>
            <p className="flex flex-col mb-4">
              <label htmlFor="itemName" className="text-slate-600 text-sm mb-2">
                Item Name
              </label>
              <input
                type="text"
                {...register('itemName')}
                className="px-4 py-2 border border-slate-300 w-full"
              />
            </p>
            <div className="flex  mb-4 justify-start gap-2 items-center">
              <p className="basis-1/4">
                <label htmlFor="quantity" className="text-slate-600 text-sm mb-2">
                  Qty.
                </label>
                <input
                  type="text"
                  {...register('quantity')}
                  className="px-4 py-2 border border-slate-300 w-full"
                />
              </p>
              <p className="basis-2/5">
                <label htmlFor="price" className="text-slate-600 text-sm mb-2">
                  Price
                </label>
                <input
                  type="text"
                  {...register('price')}
                  className="px-4 py-2 border border-slate-300 w-full"
                />
              </p>
  
              <p>
                <label htmlFor="price" className="text-slate-600 text-sm mb-2">
                  Total
                </label>
                <input disabled className="px-4 py-2  w-full" />
              </p>
            </div>
          </div> */}
        <p className="flex flex-col mb-4">
          <label htmlFor="status" className="text-slate-600 text-sm mb-2">
            Status
          </label>
          <select
            {...register('status')}
            className="text-slate-600 text-sm mb-2 px-4 py-2 border border-slate-300">
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </p>
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
        {/* <button onClick={addItem} className="bg-red-500">
            Add Item
          </button> */}
      </form>
      <div className="flex justify-between">
        <button onClick={() => navigate('/invoices')}>Cancel</button>
        <button onClick={handleSubmit(onSubmit)}>Save Changes</button>
      </div>
    </div>
  )
}

export default InvoiceEdit
