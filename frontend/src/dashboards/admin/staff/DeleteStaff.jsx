import { useState } from "react"
import { deleteStaff } from "../../../services/Staff"
import { useToast } from "../../../context/ToastContext"
import { getErrorMessage } from "../../../utils/getErrorMessage"
import { AlertTriangle, X } from "lucide-react"
const DeleteStaff = ({ memberId, onClose, onDelete }) => {
    const [loading, setLoading] = useState(false);
    const { showNotification } = useToast();

    const handleDelete = async () => {
        setLoading(true);

        try {
            await deleteStaff(memberId);
            showNotification("Staff deleted");
            onDelete();
            onClose();
        } catch (err) {
            showNotification(getErrorMessage(err), "error");
        } finally {
            setLoading(false);
        }
    }

    return (
          <div onClick={onClose} className='fixed inset-0 z-99 flex justify-center items-center w-full min-h-screen bg-black/30'>
            <div className='relative bg-white p-4 rounded-md shadow-xs max-w-sm w-full'>
                <div className='p-1 rounded-sm bg-black/10 hover:bg-black/20 transition-all duration-300 w-8 flex justify-center absolute right-3 top-3'>
                    <X size={20} />
                </div>
                <div className='flex items-center justify-center w-10 h-10 mx-auto rounded-full text-red-600 bg-red-600/10'>
                    <AlertTriangle /></div>
                <div className='flex flex-col justify-center w-full items-center mt-5'>
                    <h2 className='text-lg font-bold text-gray-600'>Delete this product?</h2>
                    <span>Are you sure you want to delete this element?</span>
                    <span>This action is final</span>
                </div>
                <div className='flex gap-2 w-full items-center justify-center mt-4'>
                    <button disabled={loading} onClick={onClose} className='p-2 border rounded-md w-30 hover:bg-gray-900 text-gray-900 transition-all duration-300 hover:text-white font-semibold '>Cancel</button>
                    <button onClick={onDelete} className='p-2 border rounded-md w-30 bg-red-600 hover:bg-red-500 transition-all duration-300 text-white font-semibold '>
                     {loading ? "Discarding...": " Discard"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteStaff