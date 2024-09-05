import babelConfig from '../babel.config.json';

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
        'storybook-addon-rtl',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    webpackFinal: async (config) => {
        // Resolving react native to react-native-web for storybook
        config.resolve.alias = {
            ...config.resolve.alias,
            'react-native$': 'react-native-web',
        };

        // Polyfill Node.js modules
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            path: false,
            os: false,
            tty: require.resolve('tty-browserify'),
            stream: require.resolve('stream-browserify'),
        };

        // Adjust babel-loader for NativeWind
        config.module.rules.push({
            test: /\.(js|jsx|ts|tsx)$/,
            exclude: /node_modules\/(?!react-native-css-interop)/,
            use: {
                loader: 'babel-loader',
                options: babelConfig,
            },
        });

        return config;
    },
};
export default config;
