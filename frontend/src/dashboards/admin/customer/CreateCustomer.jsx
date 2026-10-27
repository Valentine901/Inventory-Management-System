import React, {useState } from 'react'
import {createCustomer} from "../../../services/Customer";
import { useToast } from '../../../context/ToastContext';
import { getErrorMessage } from '../../../utils/getErrorMessage';


const CreateCustomer = ({ onClose }) => {
    const [customer, setCustomer] = useState({fullName: "", phone: "", address: ""});
    const [loading, setLoading] = useState(false);
    const { showNotification } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            await createCustomer(customer.fullName, customer.phone, customer.address);
            showNotification("Customer created");
            onClose();
        } catch (err) {
            showNotification(getErrorMessage(err), "error");
        } finally{
            setLoading(false);
        }
    }


  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-99 flex items-start justify-center overflow-y-auto bg-black/50 p-4 font-alt"
    >

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-customer-full_name"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl mt-4 sm:mt-12 bg-purple-50 rounded-xl p-4 sm:p-6 flex flex-col"
      >

        <div className="relative flex items-center justify-center">
          <h2 id="create-staff-title" className='text-sm text-gray-500'>
            Add new customer
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div className='w-full'>
            <label className='text-sm text-gray-500' htmlFor="full name">Full Name</label>
            <input type="text"
              value={customer.fullName}
              required
              onChange={(e) => setCustomer((prev) => ({...prev, fullName: e.target.value}))}
              placeholder='e.g., John Doe'
              className='w-full py-2 px-3 rounded-full bg-zinc-200 focus:outline-2 focus:outline-purple-600' />
          </div>
          <div className='w-full'>
            <label className='text-sm text-gray-500' htmlFor="phone">
              Phone
            </label>
            <input type="text"
              value={customer.phone}
              required
              onChange={(e) => setCustomer((prev) => ({...prev, phone: e.target.value}))}
              placeholder='e.g., 747-3473-3938'
              className='w-full py-2 px-3 rounded-full bg-zinc-200 focus:outline-2 focus:outline-purple-600' />
          </div>

          <div className='w-full'>
            <label className='text-sm text-gray-500' htmlFor="email">House Address</label>
            <input type="text"
              value={customer.address}
              required
              onChange={(e) => setCustomer((prev) => ({...prev, address: e.target.value}))}
              placeholder='e.g., No.1 Ezenu street, Omor'
              className='w-full py-2 px-3 rounded-full bg-zinc-200 focus:outline-2 focus:outline-purple-600' />
          </div>

          {/* actions */}
          <div className="mt-2 flex gap-3 sm:justify-start">
            <button
              type="button"
              onClick={onClose}
             className='p-3 rounded-full border font-semibold w-30 text-sm hover:bg-black hover:text-gray-100 transition-all duration-300'
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="p-3 rounded-full bg-purple-600 text-gray-100 hover:bg-purple-500 transition-all duration-300 font-semibold w-30 text-sm"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCustomer