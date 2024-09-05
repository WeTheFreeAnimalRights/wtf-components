import {
    RiArrowDownSLine,
    RiArrowLeftSLine,
    RiArrowRightSLine,
    RiArrowUpSLine,
} from 'react-icons/ri';

export const getArrows = (align = '') => {
    const menuPosition = align.split('-')[0];

    switch (menuPosition) {
        case 'top':
            return {
                Open: RiArrowDownSLine,
                Close: RiArrowUpSLine,
            };
        case 'right':
            return {
                Open: RiArrowLeftSLine,
                Close: RiArrowRightSLine,
            };
        case 'left':
            return {
                Open: RiArrowRightSLine,
                Close: RiArrowLeftSLine,
            };
        // Default is "bottom"
        default:
            return {
                Open: RiArrowUpSLine,
                Close: RiArrowDownSLine,
            };
    }
};
