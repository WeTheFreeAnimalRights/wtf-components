import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { DropdownMenu } from '../DropdownMenu';
import { alignOptions } from '../DropdownMenu/alignOptions';
import { useTranslations } from '../../hooks/useTranslations';
import globe from './globe.png';

export const LanguagePicker = ({
    onChange,
    linkComponent,
    showArrow,
    align = 'bottom-bottom-left',
}) => {
    const { languages, currentLanguage, setCurrentLanguage } =
        useTranslations();

    const items = map(languages, (item) => ({
        label: item.label,
        href: `/${item.code}`,
        _original: item,
    }));
    const selectedLanguage = currentLanguage || languages[0] || {};

    return (
        <DropdownMenu
            icon={<img className="h-5 me-2" src={globe} alt="" />}
            label={selectedLanguage.label || '-'}
            items={items}
            align={align}
            showArrow={showArrow}
            linkComponent={linkComponent}
            onSelect={(e, item) => {
                e.preventDefault();

                // Set the current language
                setCurrentLanguage(item._original);

                // Callback in case we need to change the url or something
                if (typeof onChange === 'function') {
                    onChange(item._original, item);
                }
            }}
        />
    );
};

LanguagePicker.propTypes = {
    /**
     * Align component to the start or the end
     */
    align: PropTypes.oneOf(alignOptions),

    /**
     * The type of link to use to display in the dropdown items
     */
    linkComponent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.elementType,
    ]),

    /**
     * Whether to show the dropdown icon
     */
    showArrow: PropTypes.bool,

    /**
     * Optional on language change handler
     */
    onChange: PropTypes.func,
};
