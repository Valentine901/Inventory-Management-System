import { getProducts } from "../../../services/Product";
import { useState, useEffect } from "react";
import ProductCard, { PRODUCT_GRID } from "./ProductCard";
import EmptyState from "../../../Components/EmptyState";
import { SearchIcon, X } from "lucide-react";
import Pagination from "../../../Components/Pagination";



const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItem, setTotalItem] = useState(0);
  // limit is also total items per page
  const limit = 4

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
    setQuery("");
  };


  const handleFetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts(currentPage, limit);
      // console.log(data);
      setProducts(data.products);
      setTotalItem(data.totalProduct)
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const totalPages = Math.ceil(totalItem/limit);


  
  useEffect(() => { handleFetchProducts() }, [currentPage]);

  const filteredProducts = products.filter((p) => {
    const name = p.name.toLowerCase().includes(query.toLowerCase());
    return name;
  })


  return (
    <div className='bg-purple-600/5 min-h-screen w-full p-4 flex flex-col gap-3 font-alt'>
      <div className="flex flex-col gap-1 p-4 shadow-sm max-w-xl w-full rounded-lg">
        <span className="text-xl font-semibold text-gray-700">Product List</span>
        <span className="text-sm text-gray-600/80">View all your uploaded products</span>
      </div>


      {/* search bar */}
      <div className="flex items-center justify-end gap-2">
        {showSearch && (
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name"
            className="max-w-lg w-full px-4 py-2 placeholder:text-sm rounded-full bg-zinc-600/10 outline-none focus:ring-2 focus:ring-purple-600/40 transition"
          />
        )}
        <button
          type="button"
          onClick={toggleSearch}
          aria-label={showSearch ? "Close search" : "Open search"}
          className="shrink-0 p-3 rounded-xl text-purple-600 bg-purple-600/10 hover:bg-purple-600/20 cursor-pointer transition-colors"
        >
          {showSearch ? <X /> : <SearchIcon />}
        </button>
      </div>

      {loading && (
        <div className="flex flex-col gap-2 w-full animate-pulse">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`${PRODUCT_GRID} w-full rounded-xl bg-white border border-zinc-200 p-3`}
            >
              {/* Product image */}
              <div className="w-16 h-14 rounded-lg bg-zinc-300/60" />

              {/* Name + category (two lines) */}
              <div className="flex flex-col gap-2">
                <div className="h-3 w-3/4 rounded-full bg-zinc-300/60" />
                <div className="h-3 w-1/2 rounded-full bg-zinc-200" />
              </div>

              {/* These columns only show from `md` up, like the real row would */}
              <div className="hidden md:block h-3 w-3/4 rounded-full bg-zinc-300/60" />
              <div className="hidden md:block h-3 w-1/2 rounded-full bg-zinc-300/60" />
              <div className="hidden md:block h-3 w-2/3 rounded-full bg-zinc-300/60" />

              {/* Menu button */}
              <div className="h-6 w-6 rounded-full bg-zinc-300/60 justify-self-end" />
            </div>
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (<div>
        <EmptyState />
      </div>)}

      {filteredProducts.length === 0  && <EmptyState />}

      {!loading && products.length > 0 && (
        <>
        <div className="flex flex-col gap-2">

          <div className={`${PRODUCT_GRID} hidden md:grid px-3 text-xs font-semibold uppercase text-gray-500`}>
            <span />
            <span>Name</span>
            <span>Category</span>
            <span>$ Price</span>
            <span>Qty</span>
            <span />
          </div>

          {filteredProducts.map((product) => (
            <ProductCard 
            key={product.id} 
            product={product} 
            onRefresh={handleFetchProducts}
            isMenuOpen={openMenuId === product.id}
            onToggleMenu={() => setOpenMenuId((prev) => prev === product.id ? null : product.id)}
            onCloseMenu={() => setOpenMenuId(null)}
            />
          ))}

    
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </>
      )}
    </div>
  )
}

export default Product;