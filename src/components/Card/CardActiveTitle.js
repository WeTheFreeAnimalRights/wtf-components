import { Tooltip } from '../Tooltip';
import { useTranslations } from '../../hooks/useTranslations';
import { Check, Archive } from 'lucide-react';

export const CardActiveTitle = ({ active, labels, children }) => {
    const { t } = useTranslations();
    const activeLabel = labels?.active || t('Active');
    const inactiveLabel = labels?.inactive || t('Inactive');

    return (
        <div className="flex flex-row items-center">
            <div className="text-start flex-grow">{children}</div>
            <div className="text-end">
                <Tooltip message={active ? activeLabel : inactiveLabel}>
                    {active ? (
                        <Check className="inline-block" />
                    ) : (
                        <Archive className="inline-block" />
                    )}
                </Tooltip>
            </div>
        </div>
    );
};
