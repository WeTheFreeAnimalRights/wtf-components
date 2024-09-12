import { useContext } from 'react';
import { DataTableContext } from '../index';

export const usePermissions = () => {
    const { permissions } = useContext(DataTableContext);

    return {
        canView: permissions.indexOf('view') >= 0,
        canEdit: permissions.indexOf('edit') >= 0,
        canRemove: permissions.indexOf('remove') >= 0,
    };
};
