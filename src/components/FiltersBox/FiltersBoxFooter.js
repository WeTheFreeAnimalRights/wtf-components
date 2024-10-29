import React, { useContext } from 'react';
import { Button } from '../Button';
import { useTranslations } from '../../hooks/useTranslations';
import { StandardFormContext } from '../StandardForm';

export const FiltersBoxFooter = ({ loading }) => {
    const { t } = useTranslations();
    const standardForm = useContext(StandardFormContext);
    return (
        <div className="flex flex-row items-center gap-4">
            <Button
                type="submit"
                className="w-full flex-grow basis-0"
                disabled={loading}
            >
                {t('submit')}
            </Button>
            <Button
                type="submit"
                className="w-full flex-grow basis-0"
                disabled={loading}
                variant="secondary"
                onClick={() => {
                    standardForm.reset();
                }}
            >
                {t('clear')}
            </Button>
        </div>
    );
};
