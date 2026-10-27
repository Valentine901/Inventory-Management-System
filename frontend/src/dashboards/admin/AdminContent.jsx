import { Calendar, ShoppingCart, Boxes, Users, UsersRound, User, UserPlus, Truck, UserRoundPlus, Tags, Box } from "lucide-react";
import { useState, useEffect } from "react";
import CreateStaff from "./staff/CreateStaff";
import CreateCategory from "./category/CreateCategory";
import CreateSupplier from "./supplier/CreateSupplier";
import CreateProduct from "./product/CreateProduct";
import CreateCustomer from "./customer/CreateCustomer";
import NotificationModal from "../../Components/NotificationModal";
import { getStats } from "../../services/Stat";

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




import { useToast } from "../../context/ToastContext";
const AdminContent = () => {
  const [createModals, setCreateModals] = useState({trigger: ""});
  const { message } = useToast();

  const [stats, setStats] = useState({ total_products: 0, total_staff: 0, total_customer: 0, total_supplier: 0 });

  // fetching admin stat
  useEffect(() => {
    async function fetchAdminStat() {
      try {
        const data = await getStats();
        setStats({
          total_products: data.totalProduct,
          total_customer: data.totalCustomer,
          total_staff: data.totalStaff,
          total_supplier: data.totalSupplier
        })
      } catch (err) {
        console.log(err.response.data.message);
      }
    }
  fetchAdminStat();
  }, []);



  const STAT_ITEMS = [
    { label: "Total Products", total: stats.total_products || 0, icon: Boxes, bg: "bg-blue-600" },
    { label: "Total Staff", total: stats.total_staff || 0, icon: UsersRound, bg: "bg-green-600" },
    { label: "Total Suppliers", total: stats.total_supplier || 0, icon: Users, bg: "bg-purple-600" },
    { label: "Total Customers", total: stats.total_customer, icon: User, bg: "bg-orange-600" },
  ];



  function onCloseTrigger(){
    setCreateModals((prev) => ({...prev, trigger:""}));
  }

  const ADMIN_ACTIONS = [
    { label: "Staff", icon: UserPlus, onClick: () => setCreateModals((prev) => ({...prev, trigger: "staff"})) },
    { label: "Categories", icon: Tags, onClick: () => setCreateModals((prev) => ({...prev, trigger: "category"})) },
    { label: "Supplier", icon: Truck, onClick: () => setCreateModals((prev) => ({...prev, trigger: "supplier"})) },
    { label: "Customer", icon: UserRoundPlus, onClick: () => setCreateModals((prev) => ({...prev, trigger: "customer"})) },
    { label: "Product", icon: Box, onClick: () => setCreateModals((prev) => ({...prev, trigger: "product"})) },

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
      {createModals.trigger === "staff" && <CreateStaff onClose={onCloseTrigger} />}
      {createModals.trigger === "category" && <CreateCategory onClose={onCloseTrigger} />}
      {createModals.trigger === "supplier" && <CreateSupplier onClose={onCloseTrigger} />}
      {createModals.trigger === "product" && <CreateProduct onClose={onCloseTrigger} />}
      {createModals.trigger === "customer" && <CreateCustomer onClose={onCloseTrigger} />}

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