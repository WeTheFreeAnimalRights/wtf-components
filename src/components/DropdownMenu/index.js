import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp } from 'lucide-react';
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
import { cn } from '_/lib/utils';

export const DropdownMenu = ({
    label,
    menuLabel,
    items = [],
    icon,
    showArrow = true,
    onSelect,
    children,
    className,
    labelClassName,
    variant,
    align = 'center',
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <ShadDropdownMenu onOpenChange={setIsOpen} open={isOpen}>
            <ShadDropdownMenuTrigger asChild>
                {children || (
                    <Button
                        variant={variant || 'outline'}
                        className={className}
                    >
                        {icon}
                        <div className={labelClassName}>{label}</div>
                        {showArrow && (
                            <>
                                {isOpen ? (
                                    <ChevronUp className="ms-1 w-4 h-4" />
                                ) : (
                                    <ChevronDown className="ms-1 w-4 h-4" />
                                )}
                            </>
                        )}
                    </Button>
                )}
            </ShadDropdownMenuTrigger>
            <ShadDropdownMenuContent
                className="max-h-72 overflow-auto"
                align={align}
            >
                {menuLabel && (
                    <>
                        <ShadDropdownMenuLabel>
                            {menuLabel}
                        </ShadDropdownMenuLabel>
                        <ShadDropdownMenuSeparator />
                    </>
                )}
                {items.map((item, index) =>
                    item.separator ? (
                        <ShadDropdownMenuSeparator key={`separator-${index}`} />
                    ) : (
                        <ShadDropdownMenuItem
                            className="cursor-pointer"
                            key={`item-${index}`}
                            onSelect={(e) => {
                                onSelect(item, e);
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {item.icon}

                            <div className="flex flex-col w-full">
                                <div className="flex flex-row items-center justify-between">
                                    <div
                                        className={cn(
                                            'text-md text-gray-900 group-hover:text-white dark:text-gray-100 dark:group-hover:text-white',
                                            item.labelClassName
                                        )}
                                    >
                                        {item.label}
                                    </div>
                                    {item.sublabel && (
                                        <div
                                            className={cn(
                                                'text-md text-gray-400 group-hover:text-white dark:text-gray-700 dark:group-hover:text-white ms-2',
                                                item.sublabelClassName
                                            )}
                                        >
                                            {item.sublabel}
                                        </div>
                                    )}
                                </div>
                                {item.description && (
                                    <div className="text-xs text-gray-400 group-hover:text-gray-300 dark:text-gray-600">
                                        {item.description}
                                    </div>
                                )}
                            </div>
                        </ShadDropdownMenuItem>
                    )
                )}
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
            label: PropTypes.string,

            /**
             * Sublabel of the item
             */
            sublabel: PropTypes.string,

            /**
             * If the item is a separator
             */
            separator: PropTypes.bool,

            /**
             * Optional icon for the item
             */
            icon: PropTypes.element,

            /**
             * Optional classname for the label of the item
             */
            labelClassName: PropTypes.string,

            /**
             * Optional classname for the sublabel of the item
             */
            sublabelClassName: PropTypes.string,

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
