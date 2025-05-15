import React from 'react';
import PropTypes from 'prop-types';
import { Sun, Moon } from 'lucide-react';
import { currentThemeState } from '../../appState';
import { useTranslations } from '../../hooks/useTranslations';
import { SecureStore } from '../../store/SecureStore';
import { useGlobalState } from '../../store/AppState';
import { cn } from '_/lib/utils';
import { SidebarMenuButton } from '_/components/sidebar';

export const SidebarThemeToggle = ({ className = '' }) => {
    const [theme, setCurrentTheme] = useGlobalState(currentThemeState);
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
