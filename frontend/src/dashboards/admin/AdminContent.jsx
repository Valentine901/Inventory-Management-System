import { Calendar, ShoppingCart, Boxes, Users, UsersRound, User, UserPlus, Truck, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import CreateStaff from "./CreateStaff";
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



const RECENT_ORDERS = [
  { id: "ORD-1042", customer: "Amaka Obi", amount: 12500, status: "completed" },
  { id: "ORD-1041", customer: "Chidi Eze", amount: 8300, status: "pending" },
  { id: "ORD-1040", customer: "Ngozi Uche", amount: 21000, status: "completed" },
  { id: "ORD-1039", customer: "Tunde Bello", amount: 4500, status: "cancelled" },
];

const LOW_STOCK = [
  { name: "Rice 50kg", left: 3 },
  { name: "Vegetable Oil 5L", left: 5 },
  { name: "Sugar 1kg", left: 8 },
];

const STATUS_STYLES = {
  completed: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  cancelled: "bg-zinc-200 text-zinc-600",
};

import { useToast } from "../../context/ToastContext";
const AdminContent = () => {
  const [addStaff, setAddStaff] = useState(false);
  const { message } = useToast();



  const ADMIN_ACTIONS = [
    { label: "New Staff", icon: UserPlus, onClick: () => { setAddStaff(true) } },
    { label: "New Order", icon: ShoppingCart, onClick: () => { } },
    { label: "Supplier", icon: Truck, onClick: () => { } },
    { label: "Customer", icon: UserRoundPlus, onClick: () => { } },
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
      {addStaff && <CreateStaff onClose={() => setAddStaff(false)} />}

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

      {/* recent orders + low stock */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* recent orders */}
        <section className="lg:col-span-2 p-4 rounded-xl bg-white shadow-sm flex flex-col gap-3">
          <h2 className="font-semibold text-zinc-800">Recent orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left min-w-[420px]">
              <thead>
                <tr className="text-zinc-500 border-b border-zinc-200">
                  <th className="py-2 font-medium">Order</th>
                  <th className="py-2 font-medium">Customer</th>
                  <th className="py-2 font-medium">Amount</th>
                  <th className="py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map((order) => (
                  <tr key={order.id} className="border-b border-zinc-100 last:border-0">
                    <td className="py-3 font-medium text-zinc-800">{order.id}</td>
                    <td className="py-3 text-zinc-600">{order.customer}</td>
                    <td className="py-3 text-zinc-800">₦{order.amount.toLocaleString()}</td>
                    <td className="py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* low stock */}
        <section className="p-4 rounded-xl bg-white shadow-sm flex flex-col gap-3">
          <h2 className="font-semibold text-zinc-800">Low stock</h2>
          <ul className="flex flex-col gap-2">
            {LOW_STOCK.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between gap-3 p-3 rounded-lg bg-zinc-50"
              >
                <span className="text-sm text-zinc-700 truncate">{item.name}</span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-100 text-red-600 shrink-0">
                  {item.left} left
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

    </div>
  );
};

export default AdminContent;