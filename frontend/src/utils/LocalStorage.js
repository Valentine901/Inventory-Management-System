import { useState, useEffect } from "react";



export const SaveItemToLocalStorage = (key, value) => {
    if(!value || !key) return;
    localStorage.setItem(key, JSON.stringify(value));
}

export const GetItemFromLocalStorage = (key) => {
    if (!key) return;
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : null
}

export const ClearLocalStorage = (key) => {
    if (!key) return;
    localStorage.removeItem(key);
}