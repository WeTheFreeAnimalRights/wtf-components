import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Pressable } from 'react-native';
import { useRef, useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export const DropdownMenu = ({
    label,
    items = [],
    icon,
    withDivider = false,
    linkComponent = 'a',
    align = 'start',
    onSelect,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    // If the escape key is pressed, then consider it a close
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const LinkTag = linkComponent;

    return (
        <View className="relative inline-block text-start" ref={ref}>
            <View>
                <Pressable
                    role="button"
                    onPress={() => setIsOpen(!isOpen)}
                    className="bg-white dark:bg-gray-700 shadow-sm flex flex-row items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                    id="options-menu"
                >
                    {icon}
                    <Text>{label}</Text>

                    {isOpen ? (
                        <IoIosArrowUp className="ms-1" size="20px" />
                    ) : (
                        <IoIosArrowDown className="ms-1" size="20px" />
                    )}
                </Pressable>
            </View>

            {isOpen && (
                <View
                    className={`absolute
                        ${align === 'start' ? 'start-0 origin-top-start' : 'end-0 origin-top-end'}
                        w-56 mt-2 bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5 overflow-auto max-h-96
                    `}
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
                                        setIsOpen(!isOpen);

                                        if (typeof onSelect === 'function') {
                                            onSelect(e, item);
                                        }
                                    }}
                                    className={`${
                                        item.icon
                                            ? 'flex items-center'
                                            : 'block'
                                    } block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600`}
                                    role="menuitem"
                                >
                                    {item.icon}

                                    <View className="flex flex-col">
                                        <Text>{item.label}</Text>
                                        {item.description && (
                                            <Text className="text-xs text-gray-400">
                                                {item.description}
                                            </Text>
                                        )}
                                    </View>
                                </LinkTag>
                            );
                        })}
                    </View>
                </View>
            )}
        </View>
    );
};

DropdownMenu.propTypes = {
    /**
     * Label to show on the dropdown menu
     */
    label: PropTypes.string.isRequired,

    /**
     * Items in the dropdown
     */
    items: PropTypes.arrayOf(
        PropTypes.shape({
            /**
             * Label of the item
             */
            label: PropTypes.string.isRequired,

            /**
             * Href for the item (where to send the user to)
             */
            href: PropTypes.string.isRequired,

            /**
             * Optional icon for the item
             */
            icon: PropTypes.elementType,

            /**
             * Optional description of the item
             */
            description: PropTypes.string,
        })
    ).isRequired,

    /**
     * Optional icon for the dropdown
     */
    icon: PropTypes.element,

    /**
     * Whether to show divider between items
     */
    withDivider: PropTypes.bool,

    /**
     * The type of link to use to display in the dropdown items
     */
    linkComponent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.elementType,
    ]),

    /**
     * Align component to the start or the end
     */
    align: PropTypes.oneOf(['start', 'end']),

    /**
     * Optional select handler
     */
    onSelect: PropTypes.func,
};
