import { RecoilRoot } from 'recoil';
import { Empty } from './index';
import '../../base.css';

export default {
    title: 'Components/Empty',
    component: Empty,
    tags: ['autodocs'],
    argTypes: {
        onClick: {
            action: 'clicked',
        },
    },
    decorators: [
        (Story) => (
            <RecoilRoot>
                <Story />
            </RecoilRoot>
        ),
    ],
};

export const Primary = {
    args: {
        title: 'Lorem Ipsum Title',
        children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        buttonLabel: 'Click',
    },
};
