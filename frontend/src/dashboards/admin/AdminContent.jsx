import { Calendar, ShoppingCart, Boxes, Users, UsersRound, User, UserPlus, Truck, UserRoundPlus, Tags, Box, Star, ChevronRight } from "lucide-react";
import { useState } from "react";
import CreateStaff from "./staff/CreateStaff";
import CreateCategory from "./category/CreateCategory";
import CreateSupplier from "./supplier/CreateSupplier";
import CreateProduct from "./product/CreateProduct";
import NotificationModal from "../../Components/NotificationModal";

const getFormattedDate = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleDateString("en-US", { month: "short" });
  const year = today.getFullYear();

  let suffix = "th";
  if (day < 11 || day > 13) {
    switch (day % 10) {
      case 1: suffix = "st"; break;
      case 2: suffix = "nd"; break;
      case 3: suffix = "rd"; break;
    }
  }
  return `${day}${suffix} ${month}, ${year}`;
};

// Placeholder data: replace with your API responses
const STAT_ITEMS = [
  { label: "Total Products", total: 247, icon: Boxes, bg: "bg-blue-600" },
  { label: "Total Staff", total: 152, icon: UsersRound, bg: "bg-green-600" },
  { label: "Total Suppliers", total: 17, icon: Users, bg: "bg-purple-600" },
  { label: "Total Customers", total: 231, icon: User, bg: "bg-orange-600" },
];



const STATUS_STYLES = {
  completed: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  cancelled: "bg-zinc-200 text-zinc-600",
};

import { useToast } from "../../context/ToastContext";
const AdminContent = () => {
  const [addStaff, setAddStaff] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [addSupplier, setAddSupplier] = useState(false);
  const [triggerModal, setTriggerModal] = useState(null);
  const { message } = useToast();

  function onCloseTrigger (){
    setTriggerModal(null);
  }


  const ADMIN_ACTIONS = [
    { label: "Staff", icon: UserPlus, onClick: () => { setAddStaff(true); setTriggerModal("staff"); } },
    { label: "Categories", icon: Tags, onClick: () => { setAddCategory(true); setTriggerModal("category"); } },
    { label: "Supplier", icon: Truck, onClick: () => { setAddSupplier(true); setTriggerModal("supplier");} },
    { label: "Customer", icon: UserRoundPlus, onClick: () => { } },
    { label: "Product", icon: Box, onClick: () => {setTriggerModal("product"); } },
    { label: "Order", icon: ShoppingCart, onClick: () => { } },
  ];

  return (
    <div className="relative p-3 sm:p-6 flex flex-col gap-6 w-full bg-purple-600/5 font-alt min-h-screen">
      {/* notification modal */}
      <NotificationModal message={message} />

      {/* header: welcome message + date */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-black">Welcome back admin</span>
          <span className="text-sm text-zinc-600/70">Here is an overview of your store</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-600/70 font-semibold">
          <Calendar size={28} />
          <span className="text-sm sm:text-base">{getFormattedDate()}</span>
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STAT_ITEMS.map(({ label, total, icon: Icon, bg }) => (
          <div
            key={label}
            className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white shadow-sm"
          >
            <div className={`${bg} text-zinc-100 p-2.5 sm:p-3 rounded-2xl shrink-0`}>
              <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-zinc-500 font-semibold text-xs sm:text-sm truncate">{label}</span>
              <span className="font-bold font-body text-2xl sm:text-3xl text-zinc-950">{total}</span>
            </div>
          </div>
        ))}
      </div>

      {/* quick actions modal forms */}
      {triggerModal === "staff" && <CreateStaff onClose={onCloseTrigger} />}
      {triggerModal === "category" && <CreateCategory onClose={onCloseTrigger} />}
      {triggerModal === "supplier" && <CreateSupplier onClose={onCloseTrigger} />}
      {triggerModal === "product" && <CreateProduct onClose={onCloseTrigger} />}

      {/* quick actions */}
      <section className="flex flex-col gap-3">
        <h2 className="font-semibold text-zinc-800">Quick actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {ADMIN_ACTIONS.map(({ label, icon: Icon, onClick }) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              className="flex flex-col items-center justify-center gap-3 h-32 sm:h-40 p-4 rounded-xl bg-white shadow-sm font-semibold text-zinc-600 hover:text-purple-600 hover:shadow-md border border-transparent hover:border-purple-600/30 transition-all duration-300 cursor-pointer"
            >
              <Icon className="w-10 h-10 sm:w-14 sm:h-14" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AdminContent;