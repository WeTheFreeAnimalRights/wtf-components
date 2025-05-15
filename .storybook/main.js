import { mergeConfig } from 'vite';

/** @type { import('@storybook/preact-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    '@storybook/addon-backgrounds',
  ],
  framework: {
    name: '@storybook/preact-vite',
    options: {},
  },
  viteFinal: async (config) => {
    const base = (await import('../vite.config.mjs')).default;

    return mergeConfig(config, {
      ...base,
      resolve: {
        ...base.resolve,
        alias: {
          ...(base.resolve?.alias ?? {}),
          // only if needed:
          // 'react': 'preact/compat',
          // 'react-dom': 'preact/compat',
        },
      },
    });
  },
};

export default config;
