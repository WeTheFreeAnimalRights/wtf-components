export const validateText = (field, { t, z }) => {
    let rules = z.string();

    if (!field.optional) {
        rules = rules.min(1, {
            message: t('required-field'),
        });
    } else {
        rules = rules.optional();
    }

    return rules;
};
