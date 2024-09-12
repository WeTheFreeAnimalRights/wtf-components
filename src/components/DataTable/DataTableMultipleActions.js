import React, { useContext } from 'react';
import { CornerLeftDown } from 'lucide-react';
import { DropdownMenu } from '../DropdownMenu';
import { useTranslations } from '../../hooks/useTranslations';
import { usePermissions } from './hooks/usePermissions';
import { useMultipleActions } from './hooks/useMultipleActions';
import { DataTableFilters } from './DataTableFilters';
import { DataTableSearch } from './DataTableSearch';
import { useConfirm } from '../Confirm/useConfirm';
import { DataTableContext } from './index';

export const DataTableMultipleActions = ({
    meta = {},
    selectedItems = [],
    onMultipleAction,
    onFiltersApplied,
    onSearch,
}) => {
    const { t } = useTranslations();

    // Get the permissions
    const { canRemove } = usePermissions();

    // When you want to delete something
    const { confirm } = useConfirm();

    // Should we allow multiple actions and get the filters
    const { multiple, filters } = useContext(DataTableContext);

    // Multiple actions
    const actions = useMultipleActions();

    return (
        <div className="flex flex-row items-center mb-4">
            <div className="flex flex-row flex-grow basis-0 items-center">
                {multiple && canRemove && selectedItems.length > 0 && (
                    <>
                        <CornerLeftDown className="translate-y-[10px] me-2 ms-4" />
                        <DropdownMenu
                            label={t('with-selected')}
                            items={actions}
                            menuLabel={t('actions')}
                            className="me-4"
                            onSelect={(action) => {
                                if (action.action === 'remove-selected') {
                                    confirm({
                                        title: t('removing'),
                                        message: t(
                                            'are-you-sure-you-want-to-remove-multiple'
                                        ),
                                        callback: () => {
                                            if (
                                                typeof onMultipleAction ===
                                                'function'
                                            ) {
                                                onMultipleAction(
                                                    selectedItems,
                                                    action
                                                );
                                            }
                                        },
                                    });
                                } else if (
                                    typeof onMultipleAction === 'function'
                                ) {
                                    onMultipleAction(selectedItems, action);
                                }
                            }}
                        />
                    </>
                )}

                <DataTableSearch meta={meta} onSearch={onSearch} />
            </div>

            <div className="flex flex-shrink justify-end basis-0">
                <DataTableFilters
                    meta={meta}
                    filters={filters}
                    onFiltersApplied={onFiltersApplied}
                />
            </div>
        </div>
    );
};
