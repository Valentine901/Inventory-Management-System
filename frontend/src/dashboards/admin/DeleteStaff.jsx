import { useState } from "react"
import { deleteStaff } from "../../services/Staff"
import { useToast } from "../../context/ToastContext"


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
            showNotification(err.response?.data?.message ?? "Could not delete staff");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='fixed z-60 inset-0 bg-black/30 w-full min-h-screen items-center justify-center flex'>
            <div className='flex flex-col gap-5 text-center bg-zinc-100 rounded-lg p-4 w-md'>
                <span>Are you sure you wanna delete?</span>
                <div className='flex space-x-4 justify-center'>
                    <button onClick={onClose} className='py-2 rounded-lg font-semibold text-sm w-30 border border-zinc-600 hover:bg-zinc-600 hover:text-zinc-100 transition-all duration-300' >Cancel</button>
                    <button disabled={loading} onClick={handleDelete} className='py-2 rounded-lg font-semibold text-sm w-30 border border-red-600 hover:bg-red-600 text-red-600 hover:text-zinc-100 transition-all duration-300'>{loading ? "Deleting" : "Delete"}</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteStaff