import { useEffect } from 'react';
import { useLocation } from 'wouter-preact';

export const ScrollToTop = ({ el }) => {
    const location = useLocation();

    useEffect(() => {
        if (el) {
            el.scrollTo(0, 0);
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    return null;
};
