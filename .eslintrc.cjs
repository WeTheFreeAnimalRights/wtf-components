// .eslintrc.cjs
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        'import/no-anonymous-default-export': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react/display-name': 'off',
        'no-unused-vars': 'off',
        'react/no-unknown-property': 'off',
    },
    settings: {
        react: {
            version: 'detect', // Automatically picks up your installed React version
        },
    },
};
