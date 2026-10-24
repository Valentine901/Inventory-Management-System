import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { updateProduct, getProduct } from '../../../services/Product'
import { getErrorMessage } from '../../../utils/getErrorMessage'
import { useToast } from '../../../context/ToastContext'
import { getSuppliers } from '../../../services/Supplier'
import { getCategories } from '../../../services/Category'
import { ChevronDown } from 'lucide-react'

const UpdateModal = ({ onClose, onUpdate, formData, loading, productId, setFormData }) => {
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);


    useEffect(() => {
        async function loadData() {
            try {
                const productData = await getProduct(productId)
                formData.name = productData.name;
                formData.price = productData.price;
                formData.quantity = productData.quantity;
                formData.category_id = productData.category_id;
                formData.supplier_id = productData.supplier_id

                const categoriesData = await getCategories();
                setCategories(categoriesData);
                const suppliersData = await getSuppliers();
                setSuppliers(suppliersData);
            } catch (err) {
                console.log(err.response.data.message);
            }
        }

        loadData();
    }, [])

    return (
        <div onClick={onClose} className='fixed inset-0 h-screen w-full z-99 bg-black/30 flex items-center justify-center px-5'>
            <form onClick={(e) => e.stopPropagation()} onSubmit={onUpdate} className='bg-white max-w-xl rounded-xl w-full p-4 flex flex-col gap-2'>

                <div className='flex flex-col w-full gap-1'>
                    {/* input text sections */}
                    <div className='flex gap-4'>
                        <div className='w-full'>
                            <label className='text-sm text-gray-500' htmlFor="name">Name</label>
                            <input type="text"
                                value={formData?.name}
                                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                placeholder='e.g., Mouse, T-shirt'
                                className='w-full py-2 px-3 rounded-full placeholder:text-sm bg-zinc-200 focus:outline-2 focus:outline-purple-600' />
                        </div>
                        <div className='w-full'>
                            <label className='text-sm text-gray-500' htmlFor="price">Price</label>
                            <input type="number"
                                value={formData?.price}
                                onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                                placeholder='e.g., $20.00'
                                className='w-full py-2 px-3 rounded-full bg-zinc-200 focus:outline-2 focus:outline-purple-600' />
                        </div>
                    </div>


                    {/* select section */}
                    <div className='flex gap-4 mt-3'>
                        <div className="relative w-full max-w-xs">
                            <label className='text-sm text-gray-500' htmlFor="category">Select Category</label>
                            <select
                                name="category"
                                id="category"
                                value={formData?.category_id}
                                onChange={(e) => setFormData((prev) => ({ ...prev, category_id: e.target.value }))}
                                className="w-full appearance-none bg-zinc-200  text-gray-700 text-sm rounded-full py-2.5 pl-4 pr-10 cursor-pointer hover:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                            >
                                {categories.map((data) => (
                                    <option
                                        key={data.id}
                                        value={data.id}
                                    >{data?.name}</option>
                                ))}

                            </select>


                            <ChevronDown
                                size={18}
                                className="pointer-events-none absolute right-4 top-11 -translate-y-1/2 text-purple-600"
                            />
                        </div>

                        <div className="relative w-full max-w-xs flex flex-col">
                            <label className='text-sm text-gray-500' htmlFor="price">Select Supplier</label>
                            <div className=''>
                                <select
                                    name="supplier"
                                    id="supplier"
                                    value={formData?.supplier_id}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, supplier_id: e.target.value }))}
                                    className="w-full appearance-none bg-zinc-200  text-gray-700 text-sm rounded-full py-2.5 pl-4 pr-10 cursor-pointer hover:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                >

                                    {suppliers.map((data) => (
                                        <option key={data.id} value={data.id}>{data.supplier_name}</option>
                                    ))}
                                </select>


                                <ChevronDown
                                    size={18}
                                    className="pointer-events-none absolute right-4 top-10 -translate-y-1/2 text-purple-600"
                                />
                            </div>
                        </div>


                    </div>

                    {/* qty */}
                    <div>
                        <div className='w-full'>
                            <label className='text-sm text-gray-500' htmlFor="price">Quantity</label>
                            <input type="number"
                                value={formData?.quantity}
                                onChange={(e) => setFormData((prev) => ({ ...prev, quantity: e.target.value }))}
                                placeholder='e.g., 15'
                                className='w-full py-2 px-3 rounded-full bg-zinc-200 focus:outline-2 focus:outline-purple-600' />
                        </div>
                    </div>

                </div>


                <div className='flex space-x-4 mt-2'>
                    <button type='button' disabled={loading} onClick={onClose} className='p-3 rounded-full border font-semibold w-30 text-sm hover:bg-black hover:text-gray-100 transition-all duration-300'>Cancel</button>
                    <button type='submit' className='p-3 rounded-full bg-purple-600 text-gray-100 hover:bg-purple-500 transition-all duration-300 font-semibold w-30 text-sm'>{loading ? "Uploading..." : "Upload"}</button>
                </div>

            </form>
        </div>
    )
}

export default UpdateModal