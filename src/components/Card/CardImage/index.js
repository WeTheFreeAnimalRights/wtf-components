import React from 'react';
import { View, Image, Text } from 'react-native';

export const CardImage = ({
    layout = 'vertical',
    src,
    name,
    highlighted,
    className = '',

    // For the vertical layout
    aspect = 'video',
}) => {
    return (
        <>
            <View
                className={`${className}
                    items-center flex
                    ${highlighted ? 'bg-gray-100 dark:bg-gray-700 text-black dark:text-white' : 'bg-gray-300 dark:bg-gray-900 text-white dark:text-black'}
                    ${layout === 'vertical' ? 'rounded-t-md' : ''}
                    ${layout === 'horizontal' ? `w-1/3 rounded-l-md` : ''}
                `}
            >
                <Image
                    source={src}
                    alt={name}
                    resizeMode="cover"
                    className={`
                        w-full object-cover card-image basis-auto
                        ${layout === 'vertical' ? `rounded-t-md aspect-${aspect}` : ''}
                        ${layout === 'horizontal' ? `rounded-l-md h-full max-h-48` : ''}
                    `}
                />
                <Text className="sr-only">{name}</Text>
            </View>
        </>
    );
};
