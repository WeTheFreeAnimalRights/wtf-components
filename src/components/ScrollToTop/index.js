import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = ({ el }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        if (el) {
            el.scrollTo(0, 0);
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname]);

    return null;
};
