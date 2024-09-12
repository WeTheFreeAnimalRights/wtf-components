import { Pencil, Trash2, Eye } from 'lucide-react';
import { usePermissions } from './usePermissions';
import { useTranslations } from '../../../hooks/useTranslations';

export const useActions = () => {
    const { canView, canEdit, canRemove } = usePermissions();
    const { t } = useTranslations();

    const actions = [];
    if (canView) {
        actions.push({
            label: t('view'),
            action: 'view',
            icon: <Eye className="w-4 h-4 me-2" />,
        });
    }
    if (canEdit) {
        actions.push({
            label: t('edit'),
            action: 'edit',
            icon: <Pencil className="w-4 h-4 me-2" />,
        });
    }
    if (canRemove) {
        actions.push({
            label: t('remove'),
            action: 'remove',
            labelClassName: 'text-destructive',
            icon: <Trash2 className="w-4 h-4 me-2 text-destructive" />,
        });
    }

    return actions;
};
