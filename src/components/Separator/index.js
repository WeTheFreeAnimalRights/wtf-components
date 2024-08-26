import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

export const Separator = ({ label = '', className = '' }) => {
    return (
        <View className={`${className} relative flex flex-row items-center`}>
            <View className="flex-grow border-t border-gray-300 dark:border-gray-700"></View>
            {label && (
                <Text className="flex-shrink mx-2.5 text-gray-400 dark:text-gray-600">
                    {label}
                </Text>
            )}
            <View className="flex-grow border-t border-gray-300 dark:border-gray-700"></View>
        </View>
    );
};

Separator.propTypes = {
    /**
     * Optional label to show on the separator
     */
    label: PropTypes.string,

    /**
     * Optional extra classname to the input
     */
    className: PropTypes.string,
};
