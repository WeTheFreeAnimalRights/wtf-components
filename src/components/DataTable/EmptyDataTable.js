import { useTranslations } from '../../hooks/useTranslations';
import { Empty } from '../Empty';

export const EmptyDataTable = () => {
    const { t } = useTranslations();
    return (
        <Empty title={t('empty-table-title')}>
            <p>{t('empty-table-description-1')}</p>
            <p>{t('empty-table-description-2')}</p>
        </Empty>
    );
};
