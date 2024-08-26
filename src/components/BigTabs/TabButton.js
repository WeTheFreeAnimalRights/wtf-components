import React from 'react';
import { Pressable, Text, View } from 'react-native';

export const TabButton = ({
    icon,

    first,
    last,

    selected,
    children,
    onPress,
}) => (
    <Pressable
        role="button"
        className={`inline-block h-full px-4 py-6
            ${
                selected
                    ? 'bg-gray-700 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-600 dark:hover:bg-gray-50'
                    : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600'
            }
            border-gray-200 dark:border-gray-700
            ${!first ? 'border-l' : ''}
            ${first ? 'rounded-s-lg' : ''}
            ${last ? 'rounded-e-lg' : ''}
            focus:ring-4 focus:ring-blue-300 active focus:outline-none`}
        onPress={onPress}
    >
        {icon && (
            <View className="icon-container text-center mb-2">{icon}</View>
        )}
        <Text
            className={`uppercase font-semibold
            ${
                selected
                    ? 'text-white dark:text-gray-900'
                    : 'text-gray-900 dark:text-white'
            }
            `}
        >
            {children}
        </Text>
    </Pressable>
);
