import React from 'react'

const NotificationModal = ({ message }) => {
    return (
        <div
            role="status"
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-99 w-100 bg-purple-600 shadow-sm rounded-bl-full rounded-r-full p-6
            transition-all duration-500 ease-out
            ${message ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0 pointer-events-none"}`}>
                <span className="font-semibold text-gray-100">{message}</span>
        </div>
    )
}

export default NotificationModal