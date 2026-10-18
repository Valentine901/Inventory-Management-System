import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";

const StaffCard = ({staff, isMenuOpen, onToggleMenu, onEdit, onDelete}) => {
    return (
        <div
            key={staff.member_id}
            className="relative flex flex-col gap-1 p-4 rounded-xl bg-white shadow-sm justify-center items-center"
        >
            {/* is_active indicator: note is active is returned at int from response */}
            {staff.is_active === 1 && <div
                role="menu"
                className="absolute top-3 left-3 z-50"
            >
                <div className="h-4 w-4 rounded-full bg-green-600"></div>
            </div>}



            {/* three dot action icon */}
            {isMenuOpen && (
                <div
                    role="menu"
                    className="absolute top-11 right-3 z-50 w-36 py-1 rounded-lg bg-white border border-zinc-200 shadow-lg flex flex-col"
                >
                    <button
                        role="menuitem"
                        type="button"
                        onClick={onEdit}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:bg-purple-600/10 hover:text-purple-600 transition-colors cursor-pointer"
                    >
                        <Pencil size={16} />
                        Edit
                    </button>

                    <div className="my-1 h-px bg-zinc-200" />

                    <button
                        role="menuitem"
                        type="button"
                        onClick={onDelete}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                        <Trash2 size={16} />
                        Delete
                    </button>
                </div>
            )}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleMenu();
                }}
                // e.stopPropagation means I handled this click, don't tell the card
                className="absolute top-3 right-3 rounded-full hover:text-purple-600 duration-300 transition-all cursor-pointer"
            >
                <EllipsisVertical />
            </button>
            <div className="">
                <img className="w-30 rounded-full " src="src/assets/images/avatar_profile2.jpg" alt="" />
            </div>
            <span className="font-semibold text-zinc-900 truncate">{staff.username}</span>
            <span className="text-sm text-zinc-500 truncate">{staff.email}</span>
            <span className="text-sm text-zinc-500 truncate">{staff.member_id}</span>
        </div>
    )
}

export default StaffCard;