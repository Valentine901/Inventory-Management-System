import { updateStaff, getStaff } from "../../../services/Staff"
import { useState, useEffect } from "react";
import { useToast } from "../../../context/ToastContext";
import { X } from "lucide-react";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { ChevronDown } from "lucide-react";


const UpdateStaff = ({ memberId, onClose, onUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const ROLES = ["staff", "admin"]

    const { showNotification } = useToast();


    useEffect(() => {

        const loadStaff = async () => {
            try {
                const staff = await getStaff(memberId);
                setUsername(staff.username);
                setEmail(staff.email);
                setRole(staff.role);
            } catch (err) {
                showNotification(getErrorMessage(err), "error");
            } finally {
                setFetching(false);
            }
        };

        loadStaff();
    }, [memberId, showNotification]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);

        try {
            // console.log(username, email, memberId, role)
            await updateStaff({ username, email, memberId, role: role.toLowerCase() });
            showNotification("Changes made on staff successfully");
            onUpdate();
            onClose();
        } catch (err) {
            console.log(err.response?.data?.message);
            showNotification(getErrorMessage(err), "error");
        } finally {
            setLoading(false);
        }
    }

    // const roles = ["Staff", "Admin"]

    const inputClass = "w-full py-2  text-gray-700 text-sm px-3 rounded-full bg-zinc-200 focus:outline-2 focus:outline-purple-600";

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-60 flex items-start justify-center overflow-y-auto bg-black/60 p-4 font-alt"
        >

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-staff-title"
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-xl mt-4 sm:mt-12 bg-purple-50 rounded-xl p-4 sm:p-6 flex flex-col"
            >

                <div className="relative flex items-center justify-center">
                    <h2 id="create-staff-title" className="text-xl font-semibold text-zinc-800">
                        Update Staff Information
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-1 rounded-md bg-black/10 hover:bg-black/20 transition-colors cursor-pointer"
                    >
                        <X />
                    </button>
                </div>


                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className='text-sm text-gray-500' htmlFor="category">
                            Full Name
                        </label>
                        <input
                            id="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={inputClass}
                            type="text"
                            autoComplete="off"
                            placeholder="e.g., John Doe"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className='text-sm text-gray-500' htmlFor="category">
                            Email Address
                        </label>
                        <input
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputClass}
                            type="email"
                            autoComplete="off"
                            placeholder="e.g., john@gmail.com"
                        />
                    </div>

                    <div className="relative w-full">
                        <label className='text-sm text-gray-500' htmlFor="category">Assign role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full appearance-none bg-zinc-200  text-gray-700 text-sm rounded-full py-2.5 pl-4 pr-10 cursor-pointer hover:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300">
                           {ROLES.map((r) => (
                             <option key={r} className="p-3 capitalize rounded-full border border-purple-600 outline outline-purple-600" value={r}>{r}</option>
                           ))}
                        </select>

                        <ChevronDown
                            size={18}
                            className="pointer-events-none absolute right-4 top-11 -translate-y-1/2 text-purple-600"
                        />
                    </div>


                    {/* actions */}
                    <div className="mt-2 flex gap-3 sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 sm:flex-none min-w-28 py-3 rounded-full text-white font-semibold bg-black hover:bg-black/90 transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 sm:flex-none min-w-28 py-3 rounded-full text-white font-semibold bg-purple-600 hover:bg-purple-600/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateStaff