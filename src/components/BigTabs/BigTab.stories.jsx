import { BigTabs, Tab } from './index';
import '../../base.css';

export default {
    title: 'Components/BigTabs',
    component: BigTabs,
    tags: ['autodocs'],
};

const Template = (args) => <BigTabs {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: [
        <Tab name="Tab 1">Content for Tab 1</Tab>,
        <Tab name="Tab 2">Content for Tab 2</Tab>,
        <Tab name="Tab 3">Content for Tab 3</Tab>,
    ],
};
