import React, { useEffect, useState, useRef } from 'react'
import { EllipsisVertical, ImageOff, Pencil, Trash } from 'lucide-react'
import { getCategory } from "../../../services/Category";
import { BASE_IMAGE_URL } from '../../../constant/api';
import ProductDetail from './ProductDetail';
import DeleteModal from "./DeleteModal";
import UpdateModal from './UpdateModal';
import { deleteProduct, getProducts, updateProduct } from '../../../services/Product';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { useToast } from '../../../context/ToastContext';

export const PRODUCT_GRID =
  "grid grid-cols-[64px_1fr_40px] md:grid-cols-[64px_2fr_1fr_1fr_1fr_40px] gap-4 items-center";


const ProductCard = ({ product, onToggleMenu, onCloseMenu, isMenuOpen, onRefresh }) => {
  const [category, setCategory] = useState(null);
  const [isProductId, setIsProductId] = useState(null);
  const [isChange, setIsChange] = useState({ productId: "", action: "" });
  const actionRef = useRef(null);
  const { showNotification } = useToast();

  // update
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    supplier_id: "",
    category_id: ""
  })
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const loadCategory = async () => {
      try {
        const data = await getCategory(product.category_id);
        setCategory(data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
    loadCategory();
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (e) => {
      if (actionRef.current && !actionRef.current.contains(e.target)) {
        onCloseMenu();
      }
    }
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [])

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(isChange.action === "delete" ? isChange.productId : "");
      onRefresh();
      showNotification("Product item deleted")
      setIsChange({ productId: null, action: "" })
    } catch (err) {
      showNotification(getErrorMessage(err), "error");
    }
  }

    async function handleUpdateProduct(e) {
      e.preventDefault();
        setLoading(true);

        try {
            await updateProduct(isChange.action === "update" ? isChange.productId : "", formData.name, formData.price, formData.quantity, formData.category_id, formData.supplier_id);
            onRefresh();
            showNotification("Changes made successfully");
            setIsChange({ productId: null, action: "" })
            
        } catch (err) {
            showNotification(getErrorMessage(err), "error")
        } finally {
            setLoading(false);
        }
    }


  return (
    <>
      <div onClick={() => setIsProductId(product.id)} className={`${PRODUCT_GRID} relative w-full rounded-xl bg-white border border-zinc-200 p-3 text-sm shadow-xs cursor-pointer`}>

        <div className="w-16 h-14 rounded-lg bg-zinc-100 overflow-hidden flex items-center justify-center text-zinc-400">
          {product.images[0]
            ? <img src={`${BASE_IMAGE_URL}/${product.images[0]}`} alt={product.name} className="w-full h-full object-cover" />
            : <ImageOff size={20} />}
        </div>

        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-gray-800 truncate">{product.name}</span>
          <span className="md:hidden text-xs text-gray-500 truncate">
            {category?.name} · $ {product.price} · Qty {product.quantity}
          </span>
        </div>


        <span className="hidden md:block text-gray-600 truncate">{category?.name}</span>
        <span className="hidden md:block text-purple-600 font-medium">$ {product.price}</span>
        <span className="hidden md:block text-gray-600">{product.quantity}</span>

        {/* action menu modal */}
        <div ref={actionRef}>
          <button onClick={(e) => {
            e.stopPropagation();
            onToggleMenu();
          }} className="justify-self-end p-1.5 rounded-md hover:bg-zinc-100 cursor-pointer">
            <EllipsisVertical size={18} />
          </button>

          {isMenuOpen && <div className='absolute right-8 top-10 flex flex-col w-40 bg-gray-50 p-2 rounded-sm shadow-2xl shadow-purple-600/30 z-99 gap-1'>
            <div
              onClick={(e) => {
                e.stopPropagation(); onCloseMenu();
                setIsChange({ productId: product.id, action: "update" });
              }}
              className="flex items-center gap-4 hover:bg-gray-600/10 transition-all duration-300 rounded-sm p-2 cursor-pointer">
              <Pencil
                size={20} />
              <span>Edit</span>
            </div>

            <div
              onClick={(e) => {
                e.stopPropagation();
                onCloseMenu();
                setIsChange({ productId: product.id, action: "delete" });
              }}
              className="flex items-center gap-4 hover:text-red-600 hover:bg-red-600/10 transition-all duration-300 rounded-sm p-2 cursor-pointer">
              <Trash size={20} />
              <span>Delete</span>
            </div>
          </div>}

        </div>
      </div>

      {isChange.action === "delete" && <DeleteModal onClose={() => setIsChange({ productId: null, action: "" })} onDelete={handleDeleteProduct} productId={isChange.productId} />}
      {isChange.action === "update" && <UpdateModal onClose={() => setIsChange({ productId: null, action: "" })} onUpdate={handleUpdateProduct} productId={isChange.productId} formData={formData} setFormData={setFormData} loading={loading} />}

      {isProductId !== null && <ProductDetail onClose={() => setIsProductId(null)} isProductId={isProductId} />}
    </>
  )
}

export default ProductCard