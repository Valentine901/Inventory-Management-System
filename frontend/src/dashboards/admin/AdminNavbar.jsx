import { Menu } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import NotificationModal from "../../Components/NotificationModal";

const AdminNavbar = ({ showSidebar, setShowSidebar }) => {
    const { message } = useToast();
    return (
        <div className='bg-purple-100 p-4 flex justify-between items-center'>
              <NotificationModal message={message} />
            <div className="flex lg:hidden justify-end">
                <Menu onClick={() => setShowSidebar(!showSidebar)} />
            </div>
        </div>
    )
}

export default AdminNavbar;