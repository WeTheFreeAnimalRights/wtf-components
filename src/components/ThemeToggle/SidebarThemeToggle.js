import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Sun, Moon } from 'lucide-react';
import { currentThemeState } from '../../recoilState';
import { useTranslations } from '../../hooks/useTranslations';
import { SecureStore } from '../../helpers/SecureStore';
import { cn } from '_/lib/utils';
import { SidebarMenuButton } from '_/components/sidebar';

export const SidebarThemeToggle = ({ className = '' }) => {
    const theme = useRecoilValue(currentThemeState);
    const setCurrentTheme = useSetRecoilState(currentThemeState);
    const { t } = useTranslations();

    return (
        <SidebarMenuButton
            tooltip={
                theme === 'dark'
                    ? t('theme-switch-to-light')
                    : t('theme-switch-to-dark')
            }
            tooltipVisible={true}
            className={cn('w-10', className)}
            onClick={() => {
                if (theme === 'dark') {
                    SecureStore.set('theme', 'light');
                    return setCurrentTheme('light');
                }

                SecureStore.set('theme', 'dark');
                return setCurrentTheme('dark');
            }}
        >
            {theme === 'dark' && <Sun className="w-4 h-4" />}
            {theme === 'light' && <Moon className="w-4 h-4" />}
        </SidebarMenuButton>
    );
};

SidebarThemeToggle.displayName = 'SidebarThemeToggle';
SidebarThemeToggle.propTypes = {
    /**
     * Optional extra classname to the toggle
     */
    className: PropTypes.string,
};
