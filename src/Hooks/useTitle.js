import { useEffect } from "react";

export const useTitle = (title) => {
    useEffect(() => {
        const safeTitle = title ? String(title) : "CodeBook";
        document.title = `${safeTitle} - BookStore`;
    }, [title]);
};