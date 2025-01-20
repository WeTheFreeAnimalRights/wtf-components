import { isFunction } from 'lodash-es';
import React, { useState, createContext } from 'react';
import { DataTableTableHeader } from './DataTableTableHeader';
import { DataTableContent } from './DataTableContent';
import { DataTableHeader } from './DataTableHeader';
import { Pagination } from '../Pagination';
import { useTranslations } from '../../hooks/useTranslations';
import { parseTableChildren } from './helpers/parseTableChildren';
import { EmptyDataTable } from './EmptyDataTable';

// ShadCN
import { Table } from '_/components/table';
import { cn } from '_/lib/utils';

// Create a context to pass the form object
export const DataTableContext = createContext(null);

export const DataTable = ({
    data,
    pagination,
    onItemAction,
    onItemClick,
    isItemClickable = true,
    onMultipleAction,
    onPageChange,
    onFiltersApplied,
    onSearch,
    onSortingChange,

    children,
    multiple,
    permissions,
    render,

    emptyTitle,
    emptyDescription,
    emptyOnClick,
    emptyButtonLabel,
}) => {
    const { t } = useTranslations();
    const [selectedItems, setSelectedItems] = useState([]);
    const { meta, columns, filters } = parseTableChildren(children);

    // const dataExists = data.length > 0 || !isEmpty(meta.filters) || !isEmpty(meta.search.text);

    return (
        <DataTableContext.Provider
            value={{
                multiple,
                permissions,
            }}
        >
            <DataTableHeader
                meta={meta}
                filters={filters}
                selectedItems={selectedItems}
                onMultipleAction={onMultipleAction}
                onFiltersApplied={onFiltersApplied}
                onSearch={onSearch}
            />
            {isFunction(render) ? (
                data.length > 0 ? (
                    render({
                        data,
                        columns,
                        meta,
                        pagination,
                        selectedItems,
                        onSelectedItemsChange: setSelectedItems,
                        onSortingChange,
                        onItemAction,
                        onItemClick,
                        isItemClickable,
                    })
                ) : (
                    <EmptyDataTable
                        title={emptyTitle}
                        description={emptyDescription}
                        onClick={emptyOnClick}
                        buttonLabel={emptyButtonLabel}
                    />
                )
            ) : (
                <div className={cn('rounded-md', data.length > 0 && 'border')}>
                    {data.length > 0 ? (
                        <Table>
                            <DataTableTableHeader
                                columns={columns}
                                meta={meta}
                                data={data}
                                selectedItems={selectedItems}
                                onSelectedItemsChange={setSelectedItems}
                                onSortingChange={onSortingChange}
                            />
                            <DataTableContent
                                columns={columns}
                                meta={meta}
                                data={data}
                                pagination={pagination}
                                selectedItems={selectedItems}
                                onSelectedItemsChange={setSelectedItems}
                                onItemAction={onItemAction}
                                onItemClick={onItemClick}
                                isItemClickable={isItemClickable}
                            />
                        </Table>
                    ) : (
                        <EmptyDataTable
                            title={emptyTitle}
                            description={emptyDescription}
                            onClick={emptyOnClick}
                            buttonLabel={emptyButtonLabel}
                        />
                    )}
                </div>
            )}

            {data.length > 0 && (
                <div className="flex flex-row items-center justify-end space-x-2 mt-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {t('table-pagination', [
                            pagination.countFrom,
                            pagination.countTo,
                            pagination.countTotal,
                        ])}
                    </div>
                    <div>
                        {pagination.total > 1 && (
                            <Pagination
                                className="mt-2"
                                currentPage={pagination.current}
                                totalPages={pagination.total}
                                onPageChange={onPageChange}
                            />
                        )}
                    </div>
                </div>
            )}
        </DataTableContext.Provider>
    );
};
DataTable.displayName = 'DataTable';

export { Column } from './definitions/Column';
export { Filters } from './definitions/Filters';
export { Order } from './definitions/Order';
export { Search } from './definitions/Search';
export { TopRight } from './definitions/TopRight';
export { RowActions } from './definitions/RowActions';
