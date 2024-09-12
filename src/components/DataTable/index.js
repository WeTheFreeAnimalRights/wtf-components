import React, { useState, createContext } from 'react';
import { isEmpty } from 'lodash';
import { DataTableHeader } from './DataTableHeader';
import { DataTableContent } from './DataTableContent';
import { DataTableMultipleActions } from './DataTableMultipleActions';
import { Pagination } from '../Pagination';
import { useTranslations } from '../../hooks/useTranslations';
import { parseChildren } from './helpers/parseChildren';
import { EmptyDataTable } from './EmptyDataTable';

// ShadCN
import { Table } from '_/components/table';

// Create a context to pass the form object
export const DataTableContext = createContext(null);

export const DataTable = ({
    data,
    pagination,
    onItemAction,
    onMultipleAction,
    onPageChange,
    onFiltersApplied,
    onSearch,
    onSortingChange,

    children,
    multiple,
    permissions,
}) => {
    const { t } = useTranslations();
    const [selectedItems, setSelectedItems] = useState([]);
    const { meta, columns, filters } = parseChildren(children);

    // const dataExists = data.length > 0 || !isEmpty(meta.filters) || !isEmpty(meta.search.text);

    return (
        <DataTableContext.Provider
            value={{
                multiple,
                permissions,
                filters,
            }}
        >
            <DataTableMultipleActions
                meta={meta}
                selectedItems={selectedItems}
                onMultipleAction={onMultipleAction}
                onFiltersApplied={onFiltersApplied}
                onSearch={onSearch}
            />
            <div className="rounded-md border">
                <Table>
                    {data.length > 0 ? (
                        <>
                            <DataTableHeader
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
                                selectedItems={selectedItems}
                                onSelectedItemsChange={setSelectedItems}
                                onItemAction={onItemAction}
                            />
                        </>
                    ) : (
                        <EmptyDataTable />
                    )}
                </Table>
            </div>

                <div className="flex flex-row items-center justify-end space-x-2 mt-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {t('Showing {0}-{1} of {2}', [
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
        </DataTableContext.Provider>
    );
};

export { Column } from './definitions/Column';
export { Filter } from './definitions/Filter';
export { Order } from './definitions/Order';
export { Search } from './definitions/Search';
