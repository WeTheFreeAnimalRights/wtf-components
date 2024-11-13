import { isFunction } from 'lodash';
import React, { Fragment, useState } from 'react';

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '_/components/dropdown-menu';
import { cn } from '_/lib/utils';
import { Button } from '../Button';

export const MultiSelect = ({
    label,
    itemsLabel,
    items = [],
    selected = [],
    icon,
    onSelect,
    children,
    className,
    contentClassName,
    align = 'center',
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
            <DropdownMenuTrigger asChild>
                {children || (
                    <Button
                        variant="outline"
                        className={cn('bg-white dark:bg-gray-700', className)}
                    >
                        {icon}
                        {label}
                    </Button>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className={cn('max-h-72 overflow-auto', contentClassName)}
                align={align}
            >
                {itemsLabel && (
                    <>
                        <DropdownMenuLabel>{itemsLabel}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                    </>
                )}
                {items.map((item, index) => (
                    <Fragment key={`item-${index}`}>
                        {item.separator && <DropdownMenuSeparator />}

                        {item.custom && item.content}

                        {!item.separator && !item.custom && (
                            <DropdownMenuCheckboxItem
                                className="cursor-pointer"
                                key={`item-${index}`}
                                checked={selected.includes(item)}
                                onCheckedChange={(checked) => {
                                    if (!isFunction(onSelect)) {
                                        return;
                                    }

                                    if (checked) {
                                        onSelect([...selected, item]);
                                    } else {
                                        const index = selected.findIndex(
                                            (selectedItem) =>
                                                selectedItem === item
                                        );
                                        onSelect([
                                            ...selected.slice(0, index),
                                            ...selected.slice(index + 1),
                                        ]);
                                    }
                                }}
                                onSelect={(event) => event.preventDefault()}
                            >
                                {item.icon}

                                <div className="flex flex-col">
                                    <div
                                        className={cn(
                                            'text-md text-gray-700 group-hover:text-white dark:text-gray-100 dark:group-hover:text-white',
                                            item.labelClassName
                                        )}
                                    >
                                        {item.label}
                                    </div>
                                    {item.description && (
                                        <div className="text-xs text-gray-400 group-hover:text-gray-300 dark:text-gray-600">
                                            {item.description}
                                        </div>
                                    )}
                                </div>
                            </DropdownMenuCheckboxItem>
                        )}
                    </Fragment>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
