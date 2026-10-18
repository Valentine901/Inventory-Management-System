import { Menu, Car, X, LayoutDashboard, Users } from "lucide-react";

const NAV_ITEMS = [
    { label: "dashboard", icon: LayoutDashboard },
    { label: "staffs", icon: Users },
];

const SidebarContent = ({ onClose, setSelected, selected }) => (
    <>
        {/* header */}
        <div className="flex items-center justify-between px-4 py-4">
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
        <nav className="flex flex-col gap-3 p-2">
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
                        className={`flex items-center gap-3 w-full text-left rounded-md p-3 capitalize border transition-colors duration-300 ${isSelected
                                ? "bg-purple-500 text-zinc-100 border-purple-500"
                                : "bg-zinc-200/60 border-transparent hover:border-purple-500/50"
                            }`}
                    >
                        <Icon />
                        {label}
                    </button>
                )
            })}
        </nav>
    </>
);

const AdminSidebar = ({ showSidebar, setShowSidebar, setSelected, selected }) => {
    const close = () => setShowSidebar(false);

    return (
        <div className="font-alt">
            {/* large screen sidebar */}
            <aside className="hidden lg:block w-64 shrink-0 bg-purple-100 min-h-screen">
                <SidebarContent setSelected={setSelected} selected={selected} />
            </aside>

            {/* small/medium screens sidebar */}
            <div className="lg:hidden bg-purple-100">
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
                    <SidebarContent onClose={close} setShowSidebar={setShowSidebar} setSelected={setSelected} selected={selected} />
                </aside>
            </div>
        </div>
    );
};

export default AdminSidebar;