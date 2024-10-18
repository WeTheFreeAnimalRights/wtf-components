export const validateUpload = (field, { t, z }) => {
    return z.object(
        {
            // path: z.string(),
            preview: z.string(),
        },
        {
            message: t('required-field'),
        }
    );
};
