import React from 'react';
import { useTranslations } from '../../hooks/useTranslations';

export const CloseButton = ({ onHeader, onClick }) => {
    const { t } = useTranslations();

    return (
        <button
            type="button"
            className={`absolute end-4 top-4 z-20 text-gray-400 bg-transparent ${onHeader ? 'hover:bg-gray-500' : 'hover:bg-gray-100'} hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal`}
            onClick={onClick}
        >
            <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
            </svg>
            <span className="sr-only">{t('close-modal')}</span>
        </button>
    );
};
