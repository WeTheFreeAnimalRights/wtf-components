import { Trash2 } from 'lucide-react';
import { usePermissions } from './usePermissions';
import { useTranslations } from '../../../hooks/useTranslations';

export const useMultipleActions = () => {
    const { canRemove } = usePermissions();
    const { t } = useTranslations();

    const actions = [];
    if (canRemove) {
        actions.push({
            label: t('remove-selected'),
            action: 'remove-selected',
            labelClassName: 'text-destructive',
            icon: <Trash2 className="w-4 h-4 me-2 text-destructive" />,
        });
    }

    return actions;
};
