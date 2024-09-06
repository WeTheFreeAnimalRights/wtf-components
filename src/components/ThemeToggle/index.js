import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentThemeState } from '../../recoilState';
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs';
import store from 'store2';
import { useTranslations } from '../../hooks/useTranslations';

export const ThemeToggle = ({ className = '' }) => {
    const theme = useRecoilValue(currentThemeState);
    const setCurrentTheme = useSetRecoilState(currentThemeState);
    const { t } = useTranslations();

    return (
        <div className={`flex flex-col justify-center ${className || ''}`}>
            <button
                type="button"
                className={`bg-transparent hover:bg-gray-700 transition-colors flex items-center justify-center rounded-md p-2 text-sm font-medium text-gray-300 hover:text-gray-100 group`}
                title={
                    theme === 'dark'
                        ? t('theme-set-light')
                        : t('theme-set-dark')
                }
                onClick={() => {
                    if (theme === 'dark') {
                        store.set('theme', 'light');
                        return setCurrentTheme('light');
                    }

                    store.set('theme', 'dark');
                    return setCurrentTheme('dark');
                }}
            >
                {theme === 'dark' && <BsFillSunFill size="16px" />}
                {theme === 'light' && <BsMoonStarsFill size="16px" />}
            </button>
        </div>
    );
};

ThemeToggle.propTypes = {
    /**
     * Optional extra classname to the toggle
     */
    className: PropTypes.string,
};
