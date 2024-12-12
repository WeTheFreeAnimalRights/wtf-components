import { isUndefined } from 'lodash';
import { useTranslations } from '../../hooks/useTranslations';
import { Empty } from '../Empty';

export const EmptyDataTable = ({ title, description }) => {
    const { t } = useTranslations();
    return (
        <Empty title={isUndefined(title) ? t('empty-table-title') : title}>
            <p>
                {isUndefined(description)
                    ? t('empty-table-description')
                    : description}
            </p>
        </Empty>
    );
};
