import { useState } from "react"
import { deleteStaff } from "../../../services/Staff"
import { useToast } from "../../../context/ToastContext"
import { getErrorMessage } from "../../../utils/getErrorMessage"
import DeleteState from "../../../Components/DeleteState"

const DeleteStaff = ({ memberId, onClose, onDelete }) => {
    const [loading, setLoading] = useState(false);
    const { showNotification } = useToast();

    const handleDelete = async () => {
        setLoading(true);

        try {
            await deleteStaff(memberId);
            showNotification("Staff deleted");
            onDelete();
            onClose();
        } catch (err) {
            showNotification(getErrorMessage(err), "error");
        } finally {
            setLoading(false);
        }
    }

    return <DeleteState onDelete={onDelete} loading={loading} onClose={onClose} />
}

export default DeleteStaff