import { create } from "../../../services/Category"
import { useState } from "react";
import { useToast } from "../../../context/ToastContext";
import { X } from "lucide-react";
import { getErrorMessage } from "../../../utils/getErrorMessage";

const CreateCategory = ({ onClose }) => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const { showNotification } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if(!name){
            showNotification(getErrorMessage("Field must be filled"), "error");
            setLoading(false);
        }
        try {
            await create({ name });
            showNotification("Category added success");
            onClose();
        } catch (err) {
            showNotification(getErrorMessage(err.response?.data?.message), "error");
        } finally { setLoading(false) };

    }

    return (
        <div onClick={onClose} className="fixed bg-black/50 inset-0  justify-center z-99 flex min-h-screen font-alt items-center p-4 ">
            <div onClick={(e) => e.stopPropagation()} className="relative flex flex-col mt-30 bg-purple-50 p-4 rounded-lg max-w-md w-full h-50">
                <h1 id="create-category-title" className='text-sm text-gray-500'>New category</h1>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-2 top-2 p-1 rounded-md bg-black/10 hover:bg-black/20 transition-colors cursor-pointer"
                >
                    <X />
                </button>
                <form className="mt-5 flex flex-col w-full items-center gap-3" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1 w-full">
                        <input
                            type="text"
                            placeholder="Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full py-2 px-3 rounded-full bg-zinc-200 focus:outline-2 focus:outline-purple-600 placeholder:text-sm'
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 sm:flex-none min-w-28 py-3 rounded-full text-white font-semibold bg-purple-600 text-sm hover:bg-purple-600/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateCategory