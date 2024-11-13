import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Sun, Moon } from 'lucide-react';
import { currentThemeState } from '../../recoilState';
import store from 'store2';
import { useTranslations } from '../../hooks/useTranslations';
import { Button } from '../Button';

export const ThemeToggle = ({ variant, size, className }) => {
    const theme = useRecoilValue(currentThemeState);
    const setCurrentTheme = useSetRecoilState(currentThemeState);
    const { t } = useTranslations();

    return (
        <Button
            variant={variant || 'ghost'}
            size={size}
            className={className}
            onClick={() => {
                if (theme === 'dark') {
                    store.set('theme', 'light');
                    return setCurrentTheme('light');
                }

                store.set('theme', 'dark');
                return setCurrentTheme('dark');
            }}
        >
            {theme === 'dark' && <Sun className="w-4 h-4" />}
            {theme === 'light' && <Moon className="w-4 h-4" />}
        </Button>
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
