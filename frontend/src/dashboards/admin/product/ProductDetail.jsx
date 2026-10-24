import { useState, useEffect, useCallback } from "react";
import { getProduct } from "../../../services/Product";
import { getCategory } from "../../../services/Category";
import { getSupplier } from "../../../services/Supplier";
import { BASE_IMAGE_URL } from "../../../constant/api";
import { MoveRightIcon, MoveLeftIcon } from "lucide-react";





const ProductDetail = ({ onClose, isProductId }) => {
  const [item, setItem] = useState(null);
  const [category, setCategory] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageStep, setImageStep] = useState(0);

  useEffect(() => {

    const loadItem = async () => {
      setLoading(true);

      try {
        const data = await getProduct(isProductId);
        setItem(data);
        setImages(data.images);
        // category query
        const catItem = await getCategory(data.category_id);
        setCategory(catItem);
        // supplier query
        const supplierData = await getSupplier(data.supplier_id);
        setSupplier(supplierData);
      } catch (err) {

      } finally {
        setLoading(false);
      }
      
    }

    loadItem();
  }, [])

  const handleNextStep = () => {
    setImageStep((prev) => prev + 1);
  }

  const handlePrevStep = () => {
    setImageStep((prev) => prev - 1);
  }
  const imageLength = images.length;
  // images = [A.png, B.png, C.png], Imageslength = 3
  // imageStep = 0, prev + 1 ... imageStep = 2 != ImagesLength, but when ImagesLength - 1 = imageStep

  const isLast = imageStep === imageLength - 1;
  const isFirst = imageStep === 0;



  return (
    <div onClick={onClose} className="fixed cursor-pointer w-full bg-black/50 inset-0 items-center justify-center flex z-99 p-2">
      {loading && <div onClick={(e) => e.stopPropagation()} className="bg-white text-black text-xl font-semibold max-w-lg w-full rounded-2xl p-1">
        {/* image container */}
        <div className="rounded-2xl bg-gray-300 w-full object center object-cover h-60 animate-pulse"></div>

        {/* detail container */}
        <div className="w-full h-25 flex space-x-4 animate-pulse">
          <div className="py-2 flex-col flex gap-2 w-full">
            <div className="flex flex-col gap-1">
              <span className="bg-gray-300 rounded-full py-2"></span>
              <span className="w-30 bg-gray-300 rounded-full py-2"></span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="bg-gray-300 rounded-full py-2"></span>
              <span className="w-30 bg-gray-300 rounded-full py-2"></span>
            </div>
          </div>
          <div className="flex flex-col gap-1 py-2 w-full">
            <span className="bg-gray-300 rounded-full py-2"></span>
            <span className="w-30 bg-gray-300 rounded-full py-2"></span>
          </div>
        </div>
      </div>}


      {item !== null && !loading && <div onClick={(e) => e.stopPropagation()} className="bg-white max-w-lg w-full rounded-2xl p-1">
        {/* image container */}
        <div className="relative rounded-2xl w-full h-60 ">
          <button disabled={isFirst} onClick={handlePrevStep} className={`absolute inset-y-1/2 left-2 ${isFirst ? " bg-gray-600/10 text-gray-300" : "text-gray-700 bg-gray-100 hover:bg-gray-700/10 hover:text-white cursor-pointer"} transition-all duration-300 text-white w-10 rounded-xl px-2 py-4 flex items-center`}>
            <MoveLeftIcon className={`${isFirst ? "text-gray-300" : "text-black "}`} size={20} />
          </button>
          <img src={`${BASE_IMAGE_URL}/${images[imageStep]}`} alt={item?.name}
            className="w-full h-full object-contain rounded-2xl"
          />
          <button disabled={isLast} onClick={handleNextStep} className={`absolute inset-y-1/2 right-2 ${isLast ? " bg-gray-600/10 text-gray-300" : "text-gray-700 bg-gray-100 hover:bg-gray-700/10 hover:text-white cursor-pointer"} transition-all duration-300 w-10 rounded-xl px-2 py-4 flex items-center`}>
            <MoveRightIcon className={`${isLast ? "text-gray-300" : "text-black "}`} size={20} />
          </button>
        </div>

        {/* detail container */}
        <div className="w-full h-25 flex space-x-4">
          <div className="py-2 flex-col flex gap-2 w-full p-2">
            {/* name and category detail section */}
            <div className="flex flex-col">
              <span className="">{item.name}</span>
              <span className="text-sm">{category.name}</span>
            </div>
            {/* price and quantity detail section */}
            <div className="flex flex-col -space-y-1">
              <div className="flex space-x-2 items-center">
                <span className="text-sm">Price:</span>
                <span className="">${item.price}</span>
              </div>

            </div>
          </div>
          <div className="flex flex-col gap-1 py-2 w-full">
            <div className="flex space-x-2">
              <span className="text-sm">Company:</span>
              <span className=" text-sm">{supplier.company_name}</span>
            </div>
            <div className="flex space-x-2">
              <span className="text-sm">Supplier:</span>
              <span className=" text-sm">{supplier.supplier_name}</span>
            </div>
            <div className="flex space-x-2 items-center">
              <span className="text-sm">Qty:</span>
              <span className="">{item.quantity}</span>
            </div>

          </div>
        </div>
      </div>}

    </div>
  )
}

export default ProductDetail