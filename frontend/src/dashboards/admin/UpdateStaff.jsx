import { updateStaff, getStaff } from "../../services/Staff"
import { useState, useEffect } from "react";
import { useToast } from "../../context/ToastContext";
import { X } from "lucide-react";

const UpdateStaff = ({ memberId, onClose, onUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");

    const { showNotification } = useToast();


    useEffect(() => {
        let cancelled = false;

        const loadStaff = async () => {
            try {
                const staff = await getStaff(memberId);
                if (!cancelled) {
                    setUsername(staff.username);
                    setEmail(staff.email);
                    setRole(staff.role);
                }
            } catch (err) {
                if (!cancelled) {
                    showNotification(err.response?.data?.message ?? "Could not load staff");
                }
            } finally {
                if (!cancelled) setFetching(false);
            }
        };

        loadStaff();
        return () => { cancelled = true; };
    }, [memberId, showNotification]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);

        try {
            await updateStaff({ username, email, memberId, role: role.toLowerCase() });
            showNotification("Changes made on staff successfully");
            onUpdate();
            onClose();
        } catch (err) {
            showNotification(err.response?.data?.message ?? "Fail to update staff");
        } finally {
            setLoading(false);
        }
    }

    const inputClass = "w-full bg-zinc-300 py-3 px-4 rounded-full outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-purple-600/40 transition";

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
                        <label htmlFor="username" className="text-sm font-semibold text-zinc-800">
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
                        <label htmlFor="email" className="text-sm font-semibold text-zinc-800">
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

                    <select value={role} onChange={(e) => setRole(e.target.value)} className="flex flex-col gap-1 rounded-lg border border-zinc-600/50 p-3 outline outline-zinc-600/50">
                        <option className="p-3 rounded-full border border-purple-600 outline outline-purple-600" value="" disabled>Assign Roles</option>
                        <option className="p-3 rounded-full border border-purple-600 outline outline-purple-600" value="staff">Staff</option>
                        <option className="p-3 rounded-full border border-purple-600 outline outline-purple-600" value="admin">Admin</option>
                    </select>

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