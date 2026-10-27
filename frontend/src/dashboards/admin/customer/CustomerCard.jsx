import { useState, useRef, useEffect } from "react";
import { UserRound, EllipsisVertical, Pencil, Trash } from "lucide-react";
// import DeleteModal from "./DeleteModal";
// import UpdateModal from "./UpdateModal";
import { getFormattedDate } from "../../../utils/formatDate";
import { useToast } from "../../../context/ToastContext";

const CustomerCard = ({ customer, loading }) => {
    const [isAction, setIsAction] = useState(false);
    const [isChange, setIsChange] = useState("");
    const actionRef = useRef(null);
    // const [supplierId, setSupplierId] = useState(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (actionRef.current && !actionRef.current.contains(e.target)) {
                setIsAction(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []) 

    return (
        <div className="relative w-full rounded-lg shadow-xs bg-zinc-50 p-4 grid grid-cols-[2fr_1.2fr_1fr_40px] gap-4 items-center text-[14px] md:text-sm">

            {/* delete modal */}
            {/* {isChange === "delete" && <DeleteModal
                onClose={() => setIsChange(null)}
                onConfirm={() => {
                    onDelete();
                    setIsChange(null);
                }}
                loading={loading}
            />} */}

            {/* update modal */}
            {/* {isChange === "update" && <UpdateModal
                onClose={() => setIsChange(null)}  supplierId={supplierId} />} */}

            {/* Column 1: avatar icon + name + email */}
            <div className="flex items-center gap-3 min-w-0">
                <UserRound className="shrink-0 text-purple-600" />
                <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-black truncate">
                        {customer.full_name}
                    </span>
                    <span className="text-slate-500 truncate">
                        {customer.phone}
                    </span>
                </div>
            </div>

            {/* Column 2: company */}
            <span className="truncate min-w-0">{customer.address}</span>

            {/* Column 3: date */}
            <span className="text-purple-600">
                {getFormattedDate(customer.created_at)}
            </span>

            {/* Column 4: menu. The ref is on this wrapper, so the button AND the menu count as "inside" */}
            <div ref={actionRef} className="relative flex items-center justify-end">
                <button className="cursor-pointer" onClick={() => setIsAction(!isAction)}>
                    <EllipsisVertical />
                </button>

                {isAction && (
                    <div className="absolute z-50 right-0 top-8 w-40 bg-gray-50 p-2 rounded-sm shadow-2xl shadow-purple-600/30">

                        <div
                            onClick={() => {
                                setIsAction(false);
                                setIsChange("update");
                                // setSupplierId(supplier.id);
                            }}
                            className="flex items-center gap-4 hover:bg-gray-600/10 transition-all duration-300 rounded-sm p-2 cursor-pointer"
                        >
                            <Pencil size={20} />
                            <span>Edit</span>
                        </div>

                        <div
                            onClick={() => {
                                setIsAction(false);
                                setIsChange("delete")
                            }}
                            className="flex items-center gap-4 hover:text-red-600 hover:bg-red-600/10 transition-all duration-300 rounded-sm p-2 cursor-pointer"
                        >
                            <Trash size={20} />
                            <span>Delete</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


export default CustomerCard;