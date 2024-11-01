import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { getZodSchema } from './getZodSchema';
import { useTranslations } from '../useTranslations';
import { parseSuperRefinements } from './parseSuperRefinements';
import { getValuesFromSchema } from './getValuesFromSchema';

export const useStandardSchema = (standardSchema = []) => {
    const { t } = useTranslations();

    // Get the zod schema
    const { zodSchema, defaultValues } = getZodSchema(standardSchema, { t, z });

    // Get the values
    const values = getValuesFromSchema(standardSchema);

    // Make the zod object
    const zodObject = z.object(zodSchema).superRefine((values, ctx) => {
        parseSuperRefinements(standardSchema, { values, ctx, t });
    });

    return useForm({
        resolver: zodResolver(zodObject),
        defaultValues,
        values,
    });
};
