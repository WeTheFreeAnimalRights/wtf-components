import { Pagination } from './index';

export default {
    title: 'Components/Pagination',
    component: Pagination,
    tags: ['autodocs'],
    argTypes: {
        onPageChange: {
            action: 'pageChange',
        },
    },
};

export const Primary = {
    args: {
        currentPage: 1,
        totalPages: 35,
    },
};
