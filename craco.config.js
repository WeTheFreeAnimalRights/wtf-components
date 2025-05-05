// craco.config.js
module.exports = {
    jest: {
        configure: (jestConfig) => {
            jestConfig.transformIgnorePatterns = [
                'node_modules/(?!(lodash-es)/)', // force-transform lodash-es
            ];
            jestConfig.moduleNameMapper = {
                '^_/(.*)$': '<rootDir>/src/_shadcn/$1',
            };
            return jestConfig;
        },
    },
};
