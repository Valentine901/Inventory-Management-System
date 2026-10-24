import React, { useState, useEffect, useRef } from 'react'
import { getErrorMessage } from '../../../utils/getErrorMessage'
import { useToast } from '../../../context/ToastContext'
import { getSuppliers } from '../../../services/Supplier'
import { getCategories } from '../../../services/Category'
import { createProduct } from "../../../services/Product";
import { X, ChevronDown } from 'lucide-react';

const MAX_IMAGES = 5;
const CreateProduct = ({ onClose }) => {
    const [suppliers, setSuppliers] = useState([]);
    const [categories, setCategories] = useState([]);
    const { showNotification } = useToast();
    const imageSelectRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        price: 0.0,
        quantity: 0,
        category_id: "",
        supplier_id: "",
        files: [],
    })
    const [images, setImages] = useState([]);


    const handleSelectImages = (e) => {
        const selected = Array.from(e.target.files);

        const newImages = selected.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }))

        // stop images at limit 5
        setImages((prev) => [...prev, ...newImages].slice(0, MAX_IMAGES));

        e.target.value = "";
    }

    const handleRemoveImage = (index) => {
        URL.revokeObjectURL(images[index].preview);
        setImages((prev) => prev.filter((_, i) => i !== index));
    }

    useEffect(() => {
        const loadSuppliers = async () => {
            try {
                const data = await getSuppliers();
                setSuppliers(data);
                if(data.length) {
                    setFormData((prev) => ({...prev, supplier_id: data[0].id}))
                }
            } catch (err) {
                showNotification(getErrorMessage(err), "error");
            }
        }

        const loadCategories = async () => {
            try {
                const data = await getCategories();
                // console.log(data);
                setCategories(data);
               if(data.length) {
                    setFormData((prev) => ({...prev, category_id: data[0].id}))
                }
            } catch (err) {
                showNotification(getErrorMessage(err), "error");
            }
        }

        loadCategories();
        loadSuppliers();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        if (images.length === 0 ){
            showNotification("Select at least one image");
            setLoading(false);
            return;
        }
        try{
            
            const data = await createProduct(formData.name, formData.price, formData.quantity, formData.category_id, formData.supplier_id, images.map((img) => img.file));
            showNotification("Product uploaded successfully!");
            onClose();
        } catch (err) {
            showNotification(getErrorMessage(err), "error");
        } finally{setLoading(false)};
    }

    return (
        <div onClick={onClose} className='fixed inset-0 h-screen w-full bg-black/30 flex items-center justify-center px-5'>
            <form onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit} className='bg-white max-w-xl rounded-xl w-full p-4 flex flex-col gap-2'>


                {/* Previews */}
                {images.length > 0 && (
                    <div className='grid grid-cols-3 sm:grid-cols-5 gap-2'>
                        {images.map((img, index) => (
                            <div key={img.preview} className='relative aspect-square'>
                                <img
                                    src={img.preview}
                                    alt={img.file.name}
                                    className='w-full h-full object-cover rounded-lg border'
                                />
                                <button
                                    type='button'
                                    onClick={() => handleRemoveImage(index)}
                                    className='absolute top-1 right-1 bg-black text-white rounded-full w-5 h-5 flex justify-center items-center text-xs'
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {images.length !== 5 && <div
                    onClick={() => imageSelectRef.current.click()}
                    className='w-full border-2 border-purple-600 border-dashed rounded-lg h-30 flex items-center justify-center text-sm text-gray-500 cursor-pointer'
                >
                    Click to select images (max {MAX_IMAGES})
                </div>}

                <input
                    type="file"
                    ref={imageSelectRef}
                    accept="image/png, image/jpeg, image/webp"
                    multiple
                    onChange={handleSelectImages}
                    className='hidden'
                />

                <div className='flex flex-col w-full gap-1'>
                    {/* input text sections */}
                    <div className='flex gap-4'>
                        <div className='w-full'>
                            <label className='text-sm text-gray-500' htmlFor="name">Name</label>
                            <input type="text"
                                value={formData.name}
                                required
                                onChange={(e) => setFormData((prev) => ({...prev, name: e.target.value}) )}
                                placeholder='e.g., Mouse, T-shirt'
                                className='w-full py-2 px-3 rounded-full placeholder:text-sm bg-zinc-200 focus:outline-2 focus:outline-purple-600' />
                        </div>
                        <div className='w-full'>
                            <label className='text-sm text-gray-500' htmlFor="price">Price</label>
                            <input type="number"
                            required
                            value={formData.price}
                            onChange={(e) => setFormData((prev) => ({...prev, price: e.target.value}) )}
                                placeholder='e.g., $20.00'
                                className='w-full py-2 px-3 rounded-full bg-zinc-200 focus:outline-2 focus:outline-purple-600' />
                        </div>
                    </div>


                    {/* select section */}
                    <div className='flex gap-4 mt-3'>
                        <div className="relative w-full max-w-xs">
                            <label className='text-sm text-gray-500' htmlFor="price">Select Category</label>
                            <select
                                name="category"
                                id="category"
                                value={formData.category_id}
                                required
                                onChange={(e) => setFormData((prev) => ({...prev, category_id: e.target.value}) )}
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
                            <label className='text-sm text-gray-500' htmlFor="supplier">Select Supplier</label>
                            <div className=''>
                                <select
                                    name="supplier"
                                    id="supplier"
                                    required
                                    value={formData.supplier_id}
                                    onChange={(e) => setFormData((prev) => ({...prev, supplier_id: e.target.value}) )}
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
                            value={formData.quantity}
                            required
                            onChange={(e) => setFormData((prev) => ({...prev, quantity: e.target.value}) )}
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

export default CreateProduct