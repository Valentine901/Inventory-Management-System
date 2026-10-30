import { useState, useEffect } from 'react'
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { useToast } from "../../../context/ToastContext"
import { getSuppliers, deleteSupplier, updateSupplier } from '../../../services/Supplier';
import EmptyState from '../../../Components/EmptyState';
import Pagination from "../../../Components/Pagination";

import { SupplierCard } from './SupplierCard';

const Suppliers = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const { showNotification } = useToast();
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItem, setTotalItem] = useState(0);
    const limit = 4;

    useEffect(() => {
        fetchSuppliers();
    }, [currentPage])

    async function fetchSuppliers() {
        setLoading(true);
        try {
            const data = await getSuppliers(currentPage, limit);
            setItems(data.suppliers);
            setTotalItem(data.total_suppliers)
        } catch (err) {
            showNotification(getErrorMessage(err), "error");
        } finally { setLoading(false) };
    }

    const handleDeleteSupplier = async (id) => {
        setLoading(true);
        try {
            await deleteSupplier(id);
            showNotification("Supplier deleted success");
            await fetchSuppliers();

        } catch (err) {
            showNotification(getErrorMessage(err), "error");
        } finally { setLoading(false) };
    }

    const handleUpdateSupplier = async (id) => {
        setLoading(true);
        try {
            await updateSupplier(id);
            showNotification("Category deleted success");
            await fetchCategories();

        } catch (err) {
            showNotification(getErrorMessage(err), "error");
        } finally { setLoading(false) };
    }

    const filteredQueries = items.filter((data) => {
        const companyName = data.company_name.toLowerCase().includes(query.toLowerCase());
        const email = data.email.toLowerCase().includes(query.toLowerCase());
        const username = data.supplier_name.toLowerCase().includes(query.toLowerCase());
        return companyName || email || username;
    })

    const totalPages = Math.ceil(totalItem / limit)

    return (
        <div className='p-4 sm:p-6 flex flex-col gap-6 w-full bg-purple-600/5 font-alt min-h-screen'>
            {/* Top Dashboard Header Block */}
            <div className='max-w-7xl w-full mx-auto flex flex-col gap-6'>
                <div className='border border-slate-200/80 bg-white shadow-sm max-w-2xl w-full p-6 rounded-xl flex flex-col gap-1'>
                    <span className='text-xl font-bold text-slate-800 tracking-tight'>All Suppliers</span>
                    <span className='text-sm font-medium text-slate-500'>
                        View and manage all suppliers from various sectors.
                    </span>
                </div>

                <div className='max-w-lg text-sm font-normal'>
                    <input type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Search by company, email or supplier'
                    className='max-w-lg w-full px-4 py-2 rounded-full bg-zinc-600/10 outline-none focus:ring-2 focus:ring-purple-600/40 transition' />
                </div>

                {/* Empty State */}
                {!loading && filteredQueries.length === 0 && (
                    <EmptyState />
                )}

                {/* Main Content Grid */}
                {!loading && filteredQueries.length > 0 && (
                    <div className='grid grid-cols-1 gap-2'>
                        {filteredQueries.map((item, index) => (
                            <SupplierCard
                                key={item.id || index}
                                supplier={item}
                                onUpdate={() => handleUpdateSupplier(item.id)}
                                loading={loading}
                                onDelete={() => handleDeleteSupplier(item.id)}
                            />
                        ))}
                        <Pagination 
                        totalPages={totalPages}
                        currentPage={currentPage} 
                        setCurrentPage={setCurrentPage}
                        />
                    </div>
                )}

                {/* Loading cards */}
                {loading && (
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
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

export default Suppliers;
