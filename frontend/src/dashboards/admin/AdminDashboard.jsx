import AdminNavbar from "./AdminNavbar";
import AdminContent from "./AdminContent";
import AdminSidebar from "./AdminSidebar";
import Staff from "./staff/Staff";
import Categories from "./category/Categories";
import Customers from "./customer/Customers";
import Product from "./product/Product";
import Suppliers from "./supplier/Suppliers";
import { useState } from "react";


const AdminDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selected, setSelected] = useState("dashboard");

  const handleSwitchContent = () => {
    switch(selected){
      case "staffs": return <Staff />
      case "dashboard": return <AdminContent />
      case "categories": return <Categories />
      case "suppliers": return <Suppliers />
      case "products": return <Product />
      case "customers": return <Customers />
      default : return <AdminContent />
    }
  }
  

  return (
    <div className="flex w-full">
      {/* sidebar */}
      <div>
        <AdminSidebar setSelected={setSelected} selected={selected} showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>

      {/* navbar & content */}
      <div className="w-full">
        <AdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        {handleSwitchContent()}
      </div>
    </div>
  )
}

export default AdminDashboard;