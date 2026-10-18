import { useEffect } from "react";

// Any function that runs a hook is a hook

export const useAutoClear = (value, setValue, delay = 3000) => {
    useEffect(() => {
        if (!value) return;
        const timer = setTimeout(() => setValue(""), delay);
        return () => clearTimeout(timer);
    }, [value, setValue, delay])
}