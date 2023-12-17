import React from 'react'

function Form() {
  return (
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
        <h2 className="text-2xl font-bold mb-4">Items List</h2>
        {items.map((item, index) => (
          <div
            key={`${index}-item`}
            id={`item-${index}`}
            className="list-item list-none md:flex md:justify-start md:items-center">
            <p className="flex flex-col mb-4 md:mr-4">
              {' '}
              <label
                htmlFor={`item-name-${index}`}
                className="text-slate-600 text-sm mb-2 ">
                Item Name
              </label>
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
            </p>

            <div className="flex items-center justify-between ">
              <p className="flex flex-col mb-4 mr-4">
                <label
                  htmlFor={`item-name-${index}`}
                  className="text-slate-600 text-sm mb-2 ">
                  Qty.
                </label>
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) => {
                    const newItems = [...items]
                    newItems[index] = { ...item, qty: +e.target.value }
                    setItems(newItems)
                  }}
                  className="px-4 py-2 border border-slate-300 w-14"
                />
              </p>
              <p className="flex flex-col mb-4 md:mr-4">
                {' '}
                <label
                  className="text-slate-600 text-sm mb-2 "
                  htmlFor={`item-name-${index}`}>
                  Price
                </label>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) => {
                    const newItems = [...items]
                    newItems[index] = { ...item, price: +e.target.value }
                    setItems(newItems)
                  }}
                  className="px-4 py-2 border border-slate-300 w-[100px] mr-2 md:w-[220px]"
                />
              </p>
              <p className="flex flex-col mb-4 md:mr-10">
                {' '}
                <label className="text-slate-600 text-sm mb-2 " htmlFor="total">
                  Total
                </label>
                <input
                  className="px-4 py-2 border border-slate-300 w-18"
                  type="text"
                  disabled
                  value={item.qty * item.price}
                />
              </p>
              <button type="button" onClick={() => handleDeleteItem(index)}>
                <img src={TrashIcon} alt="bin icon" className="w-[14px] mt-5" />
              </button>
            </div>
            <div></div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddItem}
          className="bg-slate-100 text-slate-500 font-bold w-full py-4 rounded-3xl mt-12">
          + Add New Item
        </button>
      </div>

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
  )
}

export default Form
