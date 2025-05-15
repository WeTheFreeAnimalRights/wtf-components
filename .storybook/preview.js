import React, { useEffect } from 'react';
import '../src/base.css';
import { AppStateProvider } from '../src/store/AppState';

export default {
    tags: [],
  };

const getBackgroundClass = (background) => {
    return background === '#000000' ? 'dark' : 'light';
};

export const parameters = {
    backgrounds: {
        default: 'light',
        values: [
            { name: 'light', value: '#ffffff' },
            { name: 'dark', value: '#000000' },
        ],
    },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/i,
        },
    },
};

export const decorators = [
    (Story, context) => {
        const background = context.globals.backgrounds?.value || '#ffffff';

        useEffect(() => {
            const htmlElement = document.documentElement;
            const className = getBackgroundClass(background);

            htmlElement.classList.remove('light', 'dark');
            htmlElement.classList.add(className);

            return () => {
                htmlElement.classList.remove(className);
            };
        }, [background]);

        return (
                <AppStateProvider>
            <div style={{ backgroundColor: background, minHeight: '100%' }}>
                <Story />
            </div>
                </AppStateProvider>
        );
    },
];
