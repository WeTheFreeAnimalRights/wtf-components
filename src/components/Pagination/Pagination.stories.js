import { RecoilRoot } from 'recoil';
import { Pagination } from './index';
import '../../base.css';

export default {
    title: 'Components/Pagination',
    component: Pagination,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <RecoilRoot>
                <Story />
            </RecoilRoot>
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
