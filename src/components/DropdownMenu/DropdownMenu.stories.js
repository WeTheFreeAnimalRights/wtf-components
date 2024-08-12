import { DropdownMenu } from './index';
import '../../base.css';

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
        items: [
            {
                label: 'Home',
                link: '/',
                description: 'This is the homepage',
            },
            {
                label: 'About',
                link: '/about',
                description: 'This is the about page',
            },
        ],
        align: 'start',
    },
};
