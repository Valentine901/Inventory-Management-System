import { useState, useEffect } from "react";
import { getCustomers } from "../../../services/Customer";
import Pagination from "../../../Components/Pagination";
import EmptyState from "../../../Components/EmptyState";
import CustomerCard from "./CustomerCard";
// import EmptyState from "../../../Components/EmptyState";

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 4;
    const [totalCustomer, setTotalCustomer] = useState(0);
    const [query, setQuery] = useState("");

    const handleFetchCustomers = async () => {
        setLoading(true);
        try {
            const data = await getCustomers(currentPage, limit);
            setCustomers(data.data ?? []);
            // console.log(data.customers)
            setTotalCustomer(data.totalCustomer ?? 0);
        } catch (err) {
            console.log(err.response.data.message);
        } finally { setLoading(false); }
    }

    useEffect(() => { handleFetchCustomers() }, [currentPage]);

    const totalPages = Math.ceil(totalCustomer / limit)

    const filteredQueries = customers.filter((c) => {
        const name = c?.name?.toLowerCase().includes(query.toLowerCase());
        const address = c?.address?.toLowerCase().includes(query.toLowerCase());
        return name || address
    })

    // const q = query.toLowerCase();

    // const filteredQueries = customers.filter((c) =>
    //     c.name?.toLowerCase().includes(q) ||
    //     c.address?.toLowerCase().includes(q)
    // );

    return (
        <div className='p-4 sm:p-6 flex flex-col gap-6 w-full bg-purple-600/5 font-alt min-h-screen'>
            {/* Top Dashboard Header Block */}
            <div className='max-w-7xl w-full mx-auto flex flex-col gap-6'>
                <div className='border border-slate-200/80 bg-white shadow-sm max-w-2xl w-full p-6 rounded-xl flex flex-col gap-1'>
                    <span className='text-xl font-bold text-slate-800 tracking-tight'>All Customers</span>
                    <span className='text-sm font-medium text-slate-500'>
                        View and manage all customers.
                    </span>
                </div>

                <div className='max-w-lg text-sm font-normal'>
                    <input type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder='Search by name or house address'
                        className='max-w-lg w-full px-4 py-2 rounded-full bg-zinc-600/10 outline-none focus:ring-2 focus:ring-purple-600/40 transition' />
                </div>

                {/* Empty State */}
                {!loading && filteredQueries.length === 0 && (
                    <EmptyState />
                )}

                {/* Main Content Grid */}
                {!loading && filteredQueries.length > 0 && (
                    <>

                        <div className='grid grid-cols-1 gap-2'>
                            {filteredQueries.map((item, index) => (
                                <CustomerCard
                                    key={item.id || index}
                                    customer={item}
                                    loading={loading}
                                />
                            ))}
                        </div>
                        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
                    </>
                )}

                {/* Loading cards */}
                {loading && (
                  
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {[1, 2, 3, 4].map((num) => (
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

export default Customers;