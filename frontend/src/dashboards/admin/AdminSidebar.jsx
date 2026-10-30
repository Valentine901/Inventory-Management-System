import { LogOut, X, LayoutDashboard, Users, Tags, Box, User } from "lucide-react";

const NAV_ITEMS = [
    { label: "dashboard", icon: LayoutDashboard },
    { label: "staffs", icon: Users },
    { label: "products", icon: Box },
    { label: "categories", icon: Tags },
    { label: "suppliers", icon: Users },
    { label: "customers", icon: User },
];

const SidebarContent = ({ onClose, setSelected, selected, setIsSignout }) => (
    <>
        {/* header */}
        <div className="flex items-center justify-between px-4 py-4 z-99">
            <div className="text-3xl font-bold">
                <span className="text-purple-600">Inve</span>
                <span>nio</span>
            </div>
            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close menu"
                    className="p-1 rounded-md flex lg:hidden hover:bg-zinc-200/60"
                >
                    <X />
                </button>
            )}
        </div>

        {/* body */}
        <nav className="flex flex-col gap-3 p-2 z-99">
            {NAV_ITEMS.map(({ label, icon: Icon }) => {
                const isSelected = selected === label;
                return (
                    <button
                        type="button"
                        key={label}
                        onClick={() => {
                            setSelected(label);
                            onClose();
                        }}
                        className={`flex items-center gap-3 z-99 w-full text-left rounded-md p-3 capitalize border transition-colors duration-300 ${isSelected
                                ? "bg-purple-500 text-zinc-100 border-purple-500"
                                : "bg-zinc-200/60 border-transparent hover:border-purple-500/50"
                            }`}
                    >
                        <Icon />
                        {label}
                    </button>
                )
            })}
            <div onClick={() => {onClose(); setIsSignout(true)}} className="fixed z-99 bottom-5 flex space-x-3 bg-red-600/80 hover:bg-red-600 transition-all duration-300 cursor-pointer text-white p-3 rounded-sm w-60">
                <LogOut />
                <span>Logout</span>
            </div>
        </nav>
    </>
);

const AdminSidebar = ({ showSidebar, setShowSidebar, setSelected, selected, setIsSignout }) => {
    const close = () => setShowSidebar(false);

    return (
        <div className="font-alt z-99 h-full">
            {/* large screen sidebar */}
            <aside className="hidden h-full lg:block w-64 shrink-0 bg-purple-100 min-h-screen">
                <SidebarContent setSelected={setSelected} selected={selected} setIsSignout={setIsSignout} onClose={close} />
            </aside>

            {/* small/medium screens sidebar */}
            <div className="lg:hidden bg-purple-100 z-99 h-full">
                <div
                    onClick={close}
                    className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                />

                {/* drawer */}
                <aside
                    className={`fixed inset-y-0 left-0 z-50 w-64 max-w-[80%] bg-purple-100 shadow-xl transition-transform duration-300 ${showSidebar ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <SidebarContent onClose={close} setShowSidebar={setShowSidebar} setSelected={setSelected} selected={selected} setIsSignout={setIsSignout} />
                </aside>
            </div>
        </div>
    );
};

export default AdminSidebar;