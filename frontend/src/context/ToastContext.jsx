import { useState, useContext, useCallback, createContext, useRef } from "react";
import NotificationModal from "../Components/NotificationModal";
const ToastContext = createContext();

const ToastContextProvider = ({ children }) => {
    const [message, setMessage] = useState({ text: "", type: "success", visible: false});
    const timerRef = useRef(null);

    const showNotification = useCallback((text, type="success") => {
        clearTimeout(timerRef.current); // clear old timer, wants to know more about useRef? checkout the docs at react.com
        setMessage({ text, type, visible: true});
        timerRef.current = setTimeout(() => setMessage((prev) =>( { ...prev, visible: false })), 3500);
    }, [])

    return <ToastContext.Provider value={{message, showNotification}}>
        { children }
        <NotificationModal {...message} />
    </ToastContext.Provider>
}

export default ToastContextProvider;

export const useToast = () => useContext(ToastContext);