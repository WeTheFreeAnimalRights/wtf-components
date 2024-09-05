import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Pressable } from 'react-native';
import { useRef, useEffect, useState } from 'react';
import { Menu } from './Menu';
import { alignOptions } from './alignOptions';
import { getFits } from './getFits';
import { getArrows } from './getArrows';

export const DropdownMenu = ({
    label,
    items = [],
    icon,
    withDivider = false,
    showArrow = true,
    linkComponent = 'a',
    align = 'top-left',
    onSelect,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState(align);
    const containerRef = useRef(null);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    // If the escape key is pressed, then consider it a close
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };
        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const LinkTag = linkComponent;
    let Arrows = getArrows(menuPosition);

    useEffect(() => {
        if (!isOpen) {
            setMenuPosition(align);
            return;
        }
        const fits = getFits(buttonRef, menuRef);
        if (!fits(align)) {
            const aligned = alignOptions.some((alignItem) => {
                if (fits(alignItem)) {
                    setMenuPosition(alignItem);
                    return true;
                }

                return false;
            });
            if (!aligned) {
                setMenuPosition(align);
            }
        } else {
            setMenuPosition(align);
        }
    }, [isOpen, align]);

    return (
        <View className="relative inline-block text-start" ref={containerRef}>
            <View>
                <Pressable
                    ref={buttonRef}
                    role="button"
                    onPress={() => setIsOpen(!isOpen)}
                    className={`bg-white dark:bg-gray-700 shadow-sm flex flex-row items-center justify-center w-full rounded-md ${label ? 'px-4 py-2' : 'p-2'} hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500`}
                >
                    {icon}
                    {label && (
                        <Text className="text-sm font-medium text-gray-700 dark:text-gray-50">
                            {label}
                        </Text>
                    )}

                    {showArrow && (
                        <>
                            {isOpen ? (
                                <Arrows.Open className="ms-1" size="20px" />
                            ) : (
                                <Arrows.Close className="ms-1" size="20px" />
                            )}
                        </>
                    )}
                </Pressable>
            </View>

            {isOpen && (
                <Menu
                    ref={menuRef}
                    items={items}
                    align={menuPosition}
                    withDivider={withDivider}
                    onSelect={(e, item) => {
                        setIsOpen(!isOpen);

                        if (typeof onSelect === 'function') {
                            onSelect(e, item);
                        }
                    }}
                    LinkTag={LinkTag}
                />
            )}
        </View>
    );
};

DropdownMenu.propTypes = {
    /**
     * Label to show on the dropdown menu
     */
    label: PropTypes.string,

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
     * Whether to show the dropdown icon
     */
    showArrow: PropTypes.bool,

    /**
     * The type of link to use to display in the dropdown items
     */
    linkComponent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.elementType,
    ]),

    /**
     * Prefered alignment of the menu component
     */
    align: PropTypes.oneOf(alignOptions),

    /**
     * Optional select handler
     */
    onSelect: PropTypes.func,
};
