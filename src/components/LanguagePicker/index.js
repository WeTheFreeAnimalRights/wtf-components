import { isFunction } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { DropdownMenu } from '../DropdownMenu';
import { useTranslations } from '../../hooks/useTranslations';
import globe from './globe.png';

export const LanguagePicker = ({
    icon,
    variant,
    className,
    labelClassName,
    onChange,
    showArrow,
    children,
}) => {
    const { languages, currentLanguage, setCurrentLanguage, t } =
        useTranslations();

    const items = Object.values(languages);
    const selectedLanguage = currentLanguage || languages[0] || {};

    return (
        <DropdownMenu
            icon={icon || <img className="h-5 me-2" src={globe} alt="" />}
            label={!children && (selectedLanguage.label || '-')}
            menuLabel={t('language-picker-choose')}
            variant={variant}
            className={className}
            labelClassName={labelClassName}
            items={items}
            showArrow={showArrow}
            onSelect={(item) => {
                // Set the current language
                setCurrentLanguage(item);

                // Callback in case we need to change the url or something
                if (isFunction(onChange)) {
                    onChange(item);
                }
            }}
        >
            {children}
        </DropdownMenu>
    );
};

export { SidebarLanguagePicker } from './SidebarLanguagePicker';

LanguagePicker.displayName = 'LanguagePicker';
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
