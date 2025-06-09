import { useForm } from 'react-hook-form';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { pipe, object } from 'valibot';
import { getValidationSchema } from './getValidationSchema';
import { useTranslations } from '../useTranslations';
import { getCustomValidations } from './getCustomValidations';
import { getValuesFromSchema } from './getValuesFromSchema';

export const useStandardSchema = (standardSchema = []) => {
    const { t } = useTranslations();

    // Get the validation schema
    const { schema, defaultValues } = getValidationSchema(standardSchema, {
        t,
    });

    // Get the values
    const values = getValuesFromSchema(standardSchema);

    // Make the validation object
    const validationObject = pipe(
        object(schema),
        ...getCustomValidations(standardSchema, { t })
    );

    return useForm({
        resolver: valibotResolver(validationObject),
        defaultValues,
        values,
        criteriaMode: 'all',
    });
};
