/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/preset-create-react-app',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-backgrounds',
        '@chromatic-com/storybook',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
};
export default config;
