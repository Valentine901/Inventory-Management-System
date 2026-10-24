import React, { useState, useEffect } from 'react'
import { getCategories, deleteCategory } from '../../../services/Category';
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { useToast } from "../../../context/ToastContext"
import { Trash } from 'lucide-react';
import EmptyState from '../../../Components/EmptyState';

const Categories = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const { showNotification } = useToast();

    useEffect(() => {
        fetchCategories();
    }, [])

    async function fetchCategories() {
        setLoading(true);
        try {
            const data = await getCategories();
            setItems(data);
        } catch (err) {
            showNotification(getErrorMessage(err), "error");
        } finally { setLoading(false) };
    }
    const handleDeleteCategory = async (id) => {
        setLoading(true);
        try {
            await deleteCategory(id);
            showNotification("Category deleted success");
            await fetchCategories();

        } catch (err) {
            showNotification(getErrorMessage(err), "error");
        } finally { setLoading(false) };
    }


    return (
        <div className='p-4 sm:p-8 flex flex-col gap-6 w-full bg-purple-600/5 font-alt min-h-screen'>
            {/* Top Dashboard Header Block */}
            <div className='max-w-7xl w-full mx-auto flex flex-col gap-6'>
                <div className='border border-slate-200/80 bg-white shadow-sm max-w-2xl w-full p-6 rounded-xl flex flex-col gap-1'>
                    <span className='text-xl font-bold text-slate-800 tracking-tight'>List of Categories</span>
                    <span className='text-sm font-medium text-slate-500'>
                        View all categories and manage items under your direct control.
                    </span>
                </div>

                {/* Empty State */}
                {!loading && items.length === 0 && (
                    <EmptyState />
                )}

                {/* Main Content Grid */}
                {!loading && items.length > 0 && (
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {items.map((item, index) => (
                            <CategoryCard key={item.id || index} category={item} onDelete={() => handleDeleteCategory(item.id)} />
                        ))}
                    </div>
                )}

                {/* Loading cards */}
                {loading && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <div key={num} className='h-32 w-full border border-slate-200/60 shadow-sm rounded-xl animate-pulse bg-white p-5 flex items-center gap-4'>
                                <div className='h-12 w-12 rounded-xl bg-slate-200 shrink-0'></div>
                                <div className='flex flex-col gap-2 w-full'>
                                    <div className='h-4 bg-slate-200 rounded w-2/3'></div>
                                    <div className='h-3 bg-slate-200 rounded w-1/3'></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Categories;


export const CategoryCard = ({ category, onDelete }) => {
    // Generate a fallback avatar letter from the category name string safely
    const firstLetter = category?.name ? category.name.trim().charAt(0).toUpperCase() : '?';

    return (
        <div className='group h-32 w-full bg-white border border-slate-200/80 border-l-4 border-l-purple-600 rounded-xl p-5 flex items-center gap-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-200 hover:border-l-purple-600 hover:shadow-md cursor-pointer'>

            {/* Elegant Icon / Graphic Container */}
            <div className='h-12 w-12 rounded-xl bg-purple-50 group-hover:bg-purple-100/80 transition-colors flex items-center justify-center shrink-0 shadow-inner border border-purple-100'>
                {/* Visual Icon Variant Indicator */}
                <span className='text-purple-700 font-bold font-mono text-lg tracking-wide group-hover:scale-110 transition-transform'>
                    {firstLetter}
                </span>
            </div>

            {/* Typography Content Container */}
            <div className='flex flex-col gap-0.5 overflow-hidden'>
                <span className='text-base font-bold text-slate-800 tracking-tight group-hover:text-purple-700 transition-colors truncate'>
                    {category?.name || "Unnamed Category"}
                </span>
            </div>

            <div onClick={onDelete} className='ml-auto text-slate-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-red-500 transition-all duration-200'>
                <Trash />
            </div>

        </div>
    )
}
