export const validateBoolean = (field, { t, z }) => {
    let rules = z.boolean();

    if (!field.optional) {
        rules = rules.refine((val) => val === true, {
            message: t('required-field'),
        });
    } else {
        rules = rules.optional();
    }

    return rules;
};
