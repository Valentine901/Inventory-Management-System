import { X, Trash } from "lucide-react"

const DeleteState = ({ onClose, loading, onDelete}) => {
  return (
    <div onClick={onClose} className='fixed inset-0 z-99 flex justify-center items-center w-full min-h-screen bg-black/30'>
                <div className='relative bg-white p-4 rounded-md shadow-xs max-w-sm w-full'>
                    <div className='p-1 rounded-sm bg-black/5 hover:bg-black/10 transition-all duration-300 w-8 flex justify-center absolute right-3 top-3'>
                        <X size={20} />
                    </div>
                    <div className='flex items-center justify-center w-12 h-12 mx-auto rounded-full text-red-600 bg-red-600/5'>
                        <Trash />
                    </div>
                    <div className='flex flex-col justify-center w-full items-center mt-5'>
                        <h2 className='text-md font-bold text-black'>Delete</h2>
                        <span className="text-sm text-gray-500/80">Are you sure you want to delete?</span>
                        <span className="text-sm text-gray-500/80">This action is final</span>
                    </div>
                    <div className='flex gap-4 w-full items-center justify-around mt-4'>
                        <button disabled={loading} onClick={onClose} className='p-2 border rounded-md w-30 cursor-pointer text-gray-900 transition-all duration-300 text-sm font-semibold'>Cancel</button>
                        <button onClick={onDelete} className='p-2 border rounded-md w-30 bg-red-600 hover:bg-red-500 transition-all duration-300 cursor-pointer text-white text-sm font-semibold'>
                         {loading ? "Discarding...": " Discard"}
                        </button>
                    </div>
                </div>
            </div>
  )
}

export default DeleteState