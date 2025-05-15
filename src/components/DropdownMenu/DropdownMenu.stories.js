import { DropdownMenu } from './index';

export default {
    title: 'Components/DropdownMenu',
    component: DropdownMenu,
    tags: ['autodocs'],
    argTypes: {
        onSelect: {
            action: 'selected',
        },
    },
};

export const Primary = {
    args: {
        label: 'Menu Dropdown',
        menuLabel: 'Please select',
        items: [
            {
                label: 'Home',
                href: '/',
                description: 'This is the homepage',
            },
            {
                label: 'About',
                href: '/about',
                description: 'This is the about page',
            },
        ],
        align: 'bottom-bottom-left',
        showArrow: true,
    },
};
