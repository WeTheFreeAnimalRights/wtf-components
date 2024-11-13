import { isFunction } from 'lodash';
import { Globe } from 'lucide-react';
import React from 'react';
import PropTypes from 'prop-types';
import { DropdownMenu } from '../DropdownMenu';
import { useTranslations } from '../../hooks/useTranslations';
import { SidebarMenuButton } from '_/components/sidebar';

export const SidebarLanguagePicker = ({ onChange }) => {
    const { languages, setCurrentLanguage, t } = useTranslations();

    const items = Object.values(languages);
    // const selectedLanguage = currentLanguage || languages[0] || {};

    return (
        <DropdownMenu
            menuLabel={t('Choose a language')}
            items={items}
            onSelect={(item) => {
                // Set the current language
                setCurrentLanguage(item);

                // Callback in case we need to change the url or something
                if (isFunction(onChange)) {
                    onChange(item);
                }
            }}
        >
            <SidebarMenuButton
                tooltip={t('Change language')}
                tooltipVisible={true}
                className="w-10"
            >
                <Globe />
            </SidebarMenuButton>
        </DropdownMenu>
    );
};

SidebarLanguagePicker.displayName = 'SidebarLanguagePicker';
SidebarLanguagePicker.propTypes = {
    /**
     * Optional on language change handler
     */
    onChange: PropTypes.func,
};
