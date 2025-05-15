import React from 'react';
import { BigTabs, BigTab } from './index';

export default {
    title: 'Components/BigTabs',
    component: BigTabs,
    tags: ['autodocs'],
};

export const Primary = () => (
    <BigTabs>
        <BigTab name="Tab 1">Content for Tab 1</BigTab>
        <BigTab name="Tab 2">Content for Tab 2</BigTab>
        <BigTab name="Tab 3">Content for Tab 3</BigTab>
    </BigTabs>
);
