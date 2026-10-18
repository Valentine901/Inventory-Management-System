import { useState, useEffect, useContext, useCallback, createContext, useRef } from "react";

const ToastContext = createContext();

const ToastContextProvider = ({ children }) => {
    const [message, setMessage] = useState(null);
    const timerRef = useRef(null);

    const showNotification = useCallback((text) => {
        clearTimeout(timerRef.current); // clear old timer, wants to know more about useRef? checkout the docs at react.com
        setMessage(text);
        timerRef.current = setTimeout(() => setMessage(null), 3500);
    }, [])

    return <ToastContext.Provider value={{message, showNotification }}>
        { children }
    </ToastContext.Provider>
}

export default ToastContextProvider;

export const useToast = () => useContext(ToastContext);