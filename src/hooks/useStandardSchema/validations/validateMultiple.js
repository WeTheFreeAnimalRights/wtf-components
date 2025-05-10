export const validateMultiple = (field, { t, z }) => {
    let rules = z.array(z.any());

    if (field.optional) {
        rules = rules.optional();
    } else {
        rules = rules.min(1, { message: t('required-field') });
    }

    return rules;
};
