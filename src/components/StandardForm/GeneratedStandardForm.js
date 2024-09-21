import React, { useEffect } from 'react';
import { Spinner } from '../Spinner';
import { Alert } from '../Alert';
import { Button } from '../Button';
import { StandardForm } from './index';
import { GeneratedStandardFields } from './GeneratedStandardFields';
import { getStandardSchema } from '../../helpers/getStandardSchema';
import { useTranslations } from '../../hooks/useTranslations';
import { useStandardForm } from '../../hooks/useStandardForm';
import { parseChildren } from './helpers/parseChildren';
import { cn } from '_/lib/utils';

export const GeneratedStandardForm = ({
    schema,
    requestObject,
    onSuccess,
    onError,
    options,
    footer,
    values,
    children,
    className,
}) => {
    const { t } = useTranslations();

    // Try to get the schema from the children
    let usedSchema = schema;
    if (!usedSchema) {
        if (children) {
            usedSchema = parseChildren(children);
        } else {
            throw new Error(
                'A schema needs to be sent to the GeneratedStandardForm component'
            );
        }
    }

    const { error, loading, form } = useStandardForm({
        schema: usedSchema,
        requestObject: requestObject || {},
        onSuccess,
        onError,
        options,
    });

    const fields = getStandardSchema(usedSchema, options);
    console.log('>>Fields', usedSchema);
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
        <StandardForm
            form={form}
            className={cn('relative space-y-4', className)}
        >
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
