import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button } from '../Button';

// ShadCN
import {
    DropdownMenu as ShadDropdownMenu,
    DropdownMenuTrigger as ShadDropdownMenuTrigger,
    DropdownMenuContent as ShadDropdownMenuContent,
    DropdownMenuLabel as ShadDropdownMenuLabel,
    DropdownMenuSeparator as ShadDropdownMenuSeparator,
    DropdownMenuItem as ShadDropdownMenuItem,
} from '_/components/dropdown-menu';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const DropdownMenu = ({
    label,
    menuLabel,
    items = [],
    icon,
    showArrow = true,
    onSelect,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <ShadDropdownMenu onOpenChange={() => setIsOpen(!isOpen)} open={isOpen}>
            <ShadDropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white dark:bg-gray-700">
                    {icon}
                    {label}
                    {showArrow && (
                        <>
                            {isOpen ? (
                                <ChevronUp className="ms-1" />
                            ) : (
                                <ChevronDown className="ms-1" />
                            )}
                        </>
                    )}
                </Button>
            </ShadDropdownMenuTrigger>
            <ShadDropdownMenuContent className="max-h-72 overflow-auto">
                {menuLabel && (
                    <>
                        <ShadDropdownMenuLabel>
                            {menuLabel}
                        </ShadDropdownMenuLabel>
                        <ShadDropdownMenuSeparator />
                    </>
                )}
                {items.map((item, index) => (
                    <ShadDropdownMenuItem
                        className="cursor-pointer"
                        key={`item-${index}`}
                        onSelect={() => onSelect(item)}
                    >
                        {item.icon}

                        <div className="flex flex-col">
                            <div className="text-md text-gray-700 group-hover:text-white dark:text-gray-100 dark:group-hover:text-white">
                                {item.label}
                            </div>
                            {item.description && (
                                <div className="text-xs text-gray-400 group-hover:text-gray-300 dark:text-gray-600">
                                    {item.description}
                                </div>
                            )}
                        </div>
                    </ShadDropdownMenuItem>
                ))}
            </ShadDropdownMenuContent>
        </ShadDropdownMenu>
    );
};

DropdownMenu.propTypes = {
    /**
     * Label to show on the dropdown trigger
     */
    label: PropTypes.string,

    /**
     * Label to show on the dropdown menu
     */
    menuLabel: PropTypes.string,

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
     * Whether to show the dropdown icon
     */
    showArrow: PropTypes.bool,

    /**
     * Optional select handler
     */
    onSelect: PropTypes.func,
};
