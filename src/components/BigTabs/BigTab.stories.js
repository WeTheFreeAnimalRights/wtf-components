import { BigTab } from './index';
import '../../base.css';

export default {
    title: 'Components/BigTabs/BigTab',
    component: BigTab,
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: 'text',
            defaultValue: 'Default Tab Content',
        },
    },
};

export const Primary = {
    args: {
        children: 'This is a regular tab with regular things',
        visible: true,
    },
};
