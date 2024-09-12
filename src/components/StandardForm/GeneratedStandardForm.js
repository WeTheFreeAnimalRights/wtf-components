import React, { useEffect } from 'react';
import { Spinner } from '../Spinner';
import { Alert } from '../Alert';
import { Button } from '../Button';
import { StandardForm } from './index';
import { GeneratedStandardFields } from './GeneratedStandardFields';
import { getStandardSchema } from '../../helpers/getStandardSchema';
import { getStandardDefaultValues } from '../../helpers/getStandardDefaultValues';
import { useTranslations } from '../../hooks/useTranslations';
import { useStandardForm } from '../../hooks/useStandardForm';

export const GeneratedStandardForm = ({
    schema,
    requestObject,
    onSuccess,
    onError,
    options,
    footer,
    values,
}) => {
    const { t } = useTranslations();

    const { error, loading, form } = useStandardForm({
        schema,
        requestObject: requestObject || {},
        onSuccess,
        onError,
        options,
    });

    const fields = getStandardSchema(schema, options);
    const submitArea =
        typeof footer === 'function' ? (
            footer({ error, loading })
        ) : (
            <Button type="submit" className="w-full" disabled={loading}>
                {t('submit')}
            </Button>
        );

    useEffect(() => {
        if (values) {
            form.reset(values);
        }
    }, [values]);

    return (
        <StandardForm form={form} className="relative space-y-4">
            {loading && (
                <div className="absolute left-0 right-0 top-0 bottom-0 rounded-lg bg-white/75 z-10 flex flex-col items-center justify-center dark:bg-gray-800/75">
                    <Spinner />
                </div>
            )}

            <GeneratedStandardFields
                fields={fields}
                loading={loading}
                error={error}
            />

            {error && (
                <Alert
                    className="mb-3"
                    variant="destructive"
                    title={t('form-error')}
                >
                    {error}
                </Alert>
            )}

            {submitArea}
        </StandardForm>
    );
};
