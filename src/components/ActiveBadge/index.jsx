import { Tooltip } from '../Tooltip';
import { useTranslations } from '../../hooks/useTranslations';
import { Badge } from '../Badge';

export const ActiveBadge = ({ className, active, labels }) => {
    const { t } = useTranslations();
    const activeLabel = labels?.active || t('card-active');
    const inactiveLabel = labels?.inactive || t('card-inactive');

    return (
        <Tooltip message={active ? activeLabel : inactiveLabel}>
            {active ? (
                <Badge className={className} variant="constructive">
                    {activeLabel}
                </Badge>
            ) : (
                <Badge className={className} variant="gray">
                    {inactiveLabel}
                </Badge>
            )}
        </Tooltip>
    );
};
