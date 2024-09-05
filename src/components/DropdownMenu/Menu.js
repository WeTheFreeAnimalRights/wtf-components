import { forwardRef } from 'react';
import { View, Text } from 'react-native';

export const Menu = forwardRef(
    ({ align, withDivider, items, onSelect, LinkTag }, outerRef) => {
        return (
            <View
                className={`absolute
                ${align === 'top-top-left' ? 'mb-2 bottom-full start-0' : ''}
                ${align === 'top-top-right' ? 'mb-2 bottom-full end-0' : ''}
                ${align === 'right-top-right' ? 'ms-2 top-0 start-full' : ''}
                ${align === 'right-bottom-right' ? 'ms-2 bottom-0 start-full' : ''}
                ${align === 'bottom-bottom-right' ? 'mt-2 top-full end-0' : ''}
                ${align === 'bottom-bottom-left' ? 'mt-2 top-full start-0' : ''}
                ${align === 'left-bottom-left' ? 'me-2 bottom-0 end-full' : ''}
                ${align === 'left-top-left' ? 'me-2 top-0 end-full' : ''}
                w-56 bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5 overflow-auto max-h-96
            `}
                ref={outerRef}
            >
                <View
                    className={`py-1 ${withDivider ? 'divide-y divide-gray-100' : ''}`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                >
                    {items.map((item) => {
                        return (
                            <LinkTag
                                key={item.label}
                                href={item.href}
                                onClick={(e) => {
                                    if (typeof onSelect === 'function') {
                                        onSelect(e, item);
                                    }
                                }}
                                className={`${
                                    item.icon ? 'flex items-center' : 'block'
                                } block px-4 py-2 text-md text-gray-700 group group-hover:bg-gray-100 group-hover:text-gray-900 dark:text-gray-100 dark:group-hover:text-white hover:bg-gray-600`}
                                role="menuitem"
                            >
                                {item.icon}

                                <View className="flex flex-col">
                                    <Text className="text-md text-gray-700 group-hover:text-white dark:text-gray-100 dark:group-hover:text-white">
                                        {item.label}
                                    </Text>
                                    {item.description && (
                                        <Text className="text-xs text-gray-400 group-hover:text-gray-300 dark:text-gray-600">
                                            {item.description}
                                        </Text>
                                    )}
                                </View>
                            </LinkTag>
                        );
                    })}
                </View>
            </View>
        );
    }
);
