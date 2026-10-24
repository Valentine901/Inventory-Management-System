import React from 'react'

const TOAST_STYLES = {
    success: "bg-purple-600",
    error: "bg-red-600"
}
const NotificationModal = ({ text, type, visible }) => {

    return (
        <div
            role="status"
            className={`fixed top-4 left-1/2 px-6 py-4 -translate-x-1/2 z-99 w-100 ${TOAST_STYLES[type]} shadow-sm rounded-full text-white transition-all duration-500 ease-out ${visible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0 pointers-events-none"}`}>
                {text}
        </div>
    )
}

export default NotificationModal