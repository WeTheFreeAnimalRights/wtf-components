import { Pagination } from './index';
import '../../base.css';
import { AppStateProvider } from '../../store';

export default {
    title: 'Components/Pagination',
    component: Pagination,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <AppStateProvider>
                <Story />
            </AppStateProvider>
        ),
    ],
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
