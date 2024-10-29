import React, { useContext } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Tooltip } from '../Tooltip';
import { useTranslations } from '../../hooks/useTranslations';
import { usePermissions } from './hooks/usePermissions';
import { DataTableContext } from './index';

// ShadCN
import { TableHead, TableHeader, TableRow } from '_/components/table';

export const DataTableTableHeader = ({
    columns = {},
    meta = {},
    data = [],
    onSortingChange,
    selectedItems = [],
    onSelectedItemsChange,
}) => {
    const { t } = useTranslations();

    // Called when a column gets clicked
    const { order } = meta;
    const handleColumnClick = (column) => {
        const newOrder = {
            field: column.name,
            order:
                column.name === order.field
                    ? order.order === 'asc'
                        ? 'desc'
                        : 'asc'
                    : column.defaultOrderBy,
        };

        if (typeof onSortingChange === 'function') {
            onSortingChange(newOrder);
        }
    };

    // Arrows for the sorting
    const columnArrowsClassName = 'ms-2 h-4 w-4';

    // Get the list of columns
    const columnsList = Object.values(columns);

    // Get the permissions
    const { canView, canEdit, canRemove } = usePermissions();

    // Should we allow multiple actions
    const { multiple } = useContext(DataTableContext);

    return (
        <TableHeader>
            <TableRow>
                <TableHead className="w-[50px]">
                    {multiple
                        ? canRemove && (
                              <Tooltip
                                  message={
                                      selectedItems.length === data.length
                                          ? t('unselect-all')
                                          : t('select-all')
                                  }
                              >
                                  <Checkbox
                                      checked={
                                          selectedItems.length === data.length
                                      }
                                      onCheckedChange={() => {
                                          if (
                                              selectedItems.length ===
                                              data.length
                                          ) {
                                              onSelectedItemsChange([]);
                                          } else {
                                              onSelectedItemsChange([...data]);
                                          }
                                      }}
                                      aria-label={
                                          selectedItems.length === data.length
                                              ? t('unselect-all')
                                              : t('select-all')
                                      }
                                  />
                              </Tooltip>
                          )
                        : t('No.')}
                </TableHead>
                {columnsList.map((column) => (
                    <TableHead
                        className={column.headerClassName}
                        key={`column-${column.name}`}
                    >
                        {column.sortable ? (
                            <Button
                                variant="ghost"
                                onClick={() => handleColumnClick(column)}
                            >
                                {column.label}
                                {order.field === column.name ? (
                                    order.order === 'asc' ? (
                                        <ArrowUp
                                            className={columnArrowsClassName}
                                        />
                                    ) : (
                                        <ArrowDown
                                            className={columnArrowsClassName}
                                        />
                                    )
                                ) : (
                                    <ArrowUpDown
                                        className={columnArrowsClassName}
                                    />
                                )}
                            </Button>
                        ) : (
                            column.label
                        )}
                    </TableHead>
                ))}
                {(canView || canEdit || canRemove) && (
                    <TableHead className="w-[50px]" />
                )}
            </TableRow>
        </TableHeader>
    );
};
