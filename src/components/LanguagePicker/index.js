import React from 'react';
import PropTypes from 'prop-types';
import { DropdownMenu } from '../DropdownMenu';
import { useTranslations } from '../../hooks/useTranslations';
import globe from './globe.png';

export const LanguagePicker = ({ onChange, showArrow }) => {
    const { languages, currentLanguage, setCurrentLanguage, t } =
        useTranslations();

    const items = Object.values(languages);
    const selectedLanguage = currentLanguage || languages[0] || {};

    return (
        <DropdownMenu
            icon={<img className="h-5 me-2" src={globe} alt="" />}
            label={selectedLanguage.label || '-'}
            menuLabel={t('Choose a language')}
            items={items}
            showArrow={showArrow}
            onSelect={(item) => {
                // Set the current language
                setCurrentLanguage(item);

                // Callback in case we need to change the url or something
                if (typeof onChange === 'function') {
                    onChange(item);
                }
            }}
        />
    );
};

LanguagePicker.propTypes = {
    /**
     * Whether to show the dropdown icon
     */
    showArrow: PropTypes.bool,

    /**
     * Optional on language change handler
     */
    onChange: PropTypes.func,
};
