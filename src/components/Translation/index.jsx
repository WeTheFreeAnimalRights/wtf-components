import { Fragment } from 'react';
import { getInterpolatedArray } from '../../helpers/getInterpolatedArray';
import { useTranslations } from '../../hooks/useTranslations';

export const Translation = ({ expression, vars }) => {
    const { t } = useTranslations();
    const translatedString = t(expression);
    const elements = getInterpolatedArray(translatedString, vars);
    return elements.map((element, index) => (
        <Fragment key={index}>{element}</Fragment>
    ));
};
