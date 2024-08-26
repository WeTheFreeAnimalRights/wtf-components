import React from 'react';
import { Text } from 'react-native';
import { BigTabs, BigTab } from './index';
import '../../base.css';

export default {
    title: 'Components/BigTabs',
    component: BigTabs,
    tags: ['autodocs'],
};

export const Primary = () => (
    <BigTabs>
        <BigTab name="Tab 1">
            <Text className="text-white dark:text-gray-900">
                Content for Tab 1
            </Text>
        </BigTab>
        <BigTab name="Tab 2">
            <Text className="text-white dark:text-gray-900">
                Content for Tab 2
            </Text>
        </BigTab>
        <BigTab name="Tab 3">
            <Text className="text-white dark:text-gray-900">
                Content for Tab 3
            </Text>
        </BigTab>
    </BigTabs>
);
