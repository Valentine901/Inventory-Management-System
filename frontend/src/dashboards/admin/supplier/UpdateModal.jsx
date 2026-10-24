import React from 'react'
import { X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { updateSupplier, getSupplier, getSuppliers } from '../../../services/Supplier';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { useToast } from '../../../context/ToastContext';

const UpdateModal = ({ supplierId, onClose }) => {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [companyName, setCompanyName] = useState(null);
    const [loading, setLoading] = useState(null);
    const { showNotification } = useToast();

     useEffect(() => {
            const loadSupplier = async () => {
            try {
                const data = await getSupplier(supplierId);
                setUsername(data.supplier_name);
                setEmail(data.email);
                setCompanyName(data.company_name);
            } catch (error) {
                showNotification(getErrorMessage(error), "error");
            }
        }

        loadSupplier()
     }, [supplierId])      

    const handleUpdateSupplier = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            await updateSupplier(supplierId, username, email, companyName);
            await getSuppliers();
            showNotification("Changes saved successfully");
            onClose();
        } catch (err) {
            showNotification(getErrorMessage(err), "error");
        } finally { setLoading(false) }
    }

    return (
        <div className='fixed inset-0 z-50 flex justify-center items-center bg-black/30 p-4'>
            <div className='relative max-w-xl w-full rounded-xl bg-gray-100 shadow-xl'>
                <div onClick={onClose} className='p-1 rounded-sm bg-black/10 hover:bg-black/20 transition-all duration-300 w-8 flex justify-center absolute right-3 top-3'>
                    <X size={20} />
                </div>
                {/* Header */}
                <div className='px-6 pt-5 pb-3 border-b border-gray-200'>
                    <h2 className='text-lg font-semibold text-gray-700'>Make changes to supplier</h2>
                    <p className='text-sm text-gray-500'>Update the details below and save.</p>
                </div>

                <form onSubmit={handleUpdateSupplier} className='flex flex-col gap-4 w-full p-6'>
                    {/* Stacks on phones, side by side from `sm` up */}
                    <div className='flex flex-col sm:flex-row gap-4'>
                        <div className='flex flex-col gap-1 w-full'>
                            <label htmlFor='username' className='text-sm font-medium text-gray-700'>Supplier Name</label>
                            <input
                                id='username'
                                name='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type='text'
                                className='p-3 border border-gray-300 bg-white w-full rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500'
                            />
                        </div>

                        <div className='flex flex-col gap-1 w-full'>
                            <label htmlFor='company' className='text-sm font-medium text-gray-700'>Company Name</label>
                            <input
                                id='company'
                                name='company'
                                type='text'
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className='p-3 border border-gray-300 bg-white w-full rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500'
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor='email' className='text-sm font-medium text-gray-700'>Email Address</label>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='p-3 border border-gray-300 bg-white w-full rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500'
                        />
                    </div>

                    {/* Buttons */}
                    <div className='flex gap-3 text-sm font-semibold mt-2'>
                        <button
                            onClick={onClose}
                            type='button'
                            className='flex-1 py-3 border border-gray-400 rounded-full hover:bg-black hover:text-gray-100 duration-300 transition-all'
                        >
                            Cancel
                        </button>
                        <button
                        disabled={loading}
                            type='submit'
                            className='flex-1 py-3 rounded-full bg-purple-600 text-gray-100 hover:bg-purple-500 duration-300 transition-all'
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateModal