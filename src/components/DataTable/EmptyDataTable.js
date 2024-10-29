import { useTranslations } from '../../hooks/useTranslations';
import { Empty } from '../Empty';

export const EmptyDataTable = () => {
    const { t } = useTranslations();
    return (
        <Empty title={t('No Data')}>
            <p>{t("We couldn't find any data")}</p>
            <p>{t('Refine your search and/or filters')}</p>
        </Empty>
    );
};
