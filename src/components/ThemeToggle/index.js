import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Sun, Moon } from 'lucide-react';
import { currentThemeState } from '../../recoilState';
import { useTranslations } from '../../hooks/useTranslations';
import { Button } from '../Button';
import { Tooltip } from '../Tooltip';
import { SecureStore } from '../../helpers/SecureStore';

export const ThemeToggle = ({ variant, size, className }) => {
    const theme = useRecoilValue(currentThemeState);
    const setCurrentTheme = useSetRecoilState(currentThemeState);
    const { t } = useTranslations();

    return (
        <Tooltip
            message={
                theme === 'dark'
                    ? t('theme-switch-to-light')
                    : t('theme-switch-to-dark')
            }
        >
            <Button
                variant={variant || 'ghost'}
                size={size}
                className={className}
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
            </Button>
        </Tooltip>
    );
};

export { SidebarThemeToggle } from './SidebarThemeToggle';

ThemeToggle.displayName = 'ThemeToggle';
ThemeToggle.propTypes = {
    /**
     * Optional extra classname to the toggle
     */
    className: PropTypes.string,
};
