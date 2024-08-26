import React, { useState } from 'react';
import { BigTab } from './BigTab';
import './style.scss';
import { TabButton } from './TabButton';
import { View } from 'react-native';

export const BigTabs = ({ children }) => {
    const [selected, setSelected] = useState(0);

    return (
        <>
            <View className="border-b border-gray-200 dark:border-gray-700">
                <View className="flex flex-row justify-items-stretch justify-stretch items-stretch text-sm font-medium text-center text-gray-500 rounded-lg shadow flex dark:divide-gray-700 dark:text-gray-400">
                    {children.map((child, index) => {
                        return (
                            <View
                                className="flex-grow focus-within:z-10"
                                key={`tab-${index}`}
                            >
                                <TabButton
                                    icon={child.props.icon}
                                    first={index === 0}
                                    last={index === children.length - 1}
                                    selected={index === selected}
                                    onPress={() => setSelected(index)}
                                >
                                    {child.props.name}
                                </TabButton>
                            </View>
                        );
                    })}
                </View>
            </View>

            <View className="mt-6">
                {(children || []).map((child, index) => (
                    <BigTab
                        visible={index === selected}
                        key={`tab-content-${index}`}
                    >
                        {child.props.children}
                    </BigTab>
                ))}
            </View>
        </>
    );
};

BigTabs.propTypes = {};

export { BigTab };
