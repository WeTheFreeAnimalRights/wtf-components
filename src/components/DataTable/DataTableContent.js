import React, { useContext } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Checkbox } from '../Checkbox';
import { DropdownMenu } from '../DropdownMenu';
import { Button } from '../Button';
import { DataTableCell } from './DataTableCell';
import { useTranslations } from '../../hooks/useTranslations';
import { useActions } from './hooks/useActions';
import { usePermissions } from './hooks/usePermissions';
import { useConfirm } from '../Confirm/useConfirm';
import { getIdColumn } from './helpers/getIdColumn';
import { DataTableContext } from './index';

// ShadCN
import { TableBody, TableRow, TableCell } from '_/components/table';

export const DataTableContent = ({
    columns = {},
    meta = {},
    data = [],
    pagination = {},
    selectedItems = [],
    onSelectedItemsChange,
    onItemAction,
    onItemClick,
}) => {
    const { t } = useTranslations();

    // Method to select a specific row
    const rowSelect = (row) => {
        const index = selectedItems.indexOf(row);
        if (index < 0) {
            onSelectedItemsChange([...selectedItems, row]);
        } else {
            onSelectedItemsChange([
                ...selectedItems.slice(0, index),
                ...selectedItems.slice(index + 1),
            ]);
        }
    };

    // Get the list of columns
    const columnsList = Object.values(columns);
    const idColumn = getIdColumn(columns);

    // Get the actions
    const actions = useActions();

    // Get the permissions
    const { canView, canEdit, canRemove } = usePermissions();

    // Should we allow multiple actions
    const { multiple } = useContext(DataTableContext);

    // When you want to delete something
    const { confirm } = useConfirm();

    // What happens when a user clicks on a row
    const hasItemClick = typeof onItemClick === 'function';
    const handleItemClick = (row) => {
        let select = true;
        if (hasItemClick) {
            select = onItemClick(row);
        }

        if (select && multiple) {
            rowSelect(row);
        }
    };

    return (
        <TableBody>
            {data.map((row, index) => (
                <TableRow
                    key={`row-${row[idColumn]}`}
                    className={
                        hasItemClick ? 'cursor-pointer' : 'cursor-default'
                    }
                >
                    <TableCell
                        className="w-[50px]"
                        onClick={() => handleItemClick(row)}
                    >
                        {multiple
                            ? canRemove && (
                                  <Checkbox
                                      checked={selectedItems.indexOf(row) >= 0}
                                      onCheckedChange={() => rowSelect(row)}
                                  />
                              )
                            : pagination.countFrom + index}
                    </TableCell>
                    {columnsList.map((column) => (
                        <DataTableCell
                            key={`cell-${column.name}`}
                            field={column}
                            item={row}
                            meta={meta}
                            onClick={() => {
                                if (column.handleClick !== false) {
                                    return handleItemClick(row);
                                }
                            }}
                        />
                    ))}
                    {typeof meta.rowActions === 'function' ? (
                        <TableCell>{meta.rowActions(row)}</TableCell>
                    ) : (
                        (canView || canEdit || canRemove) && (
                            <TableCell>
                                <DropdownMenu
                                    items={actions}
                                    menuLabel={t('actions')}
                                    onSelect={(action) => {
                                        if (action.action === 'remove') {
                                            confirm({
                                                title: t('removing'),
                                                message: t(
                                                    'are-you-sure-you-want-to-remove-single'
                                                ),
                                                callback: () => {
                                                    if (
                                                        typeof onItemAction ===
                                                        'function'
                                                    ) {
                                                        onItemAction(
                                                            row,
                                                            action
                                                        );
                                                    }
                                                },
                                            });
                                        } else if (
                                            typeof onItemAction === 'function'
                                        ) {
                                            onItemAction(row, action);
                                        }
                                    }}
                                >
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 p-0"
                                    >
                                        <span className="sr-only">
                                            {t('open-menu')}
                                        </span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenu>
                            </TableCell>
                        )
                    )}
                </TableRow>
            ))}
        </TableBody>
    );
};
