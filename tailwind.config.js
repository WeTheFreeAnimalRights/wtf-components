module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    safelist: [
        {
            pattern: /(min-h|min-w|max-w|w|h|aspect|p|border)-.+/,
        },
    ],
    theme: {
        extend: {
            colors: {
                'wtf-pink': '#ff6cd4',
            },
            zIndex: {
                100: '100',
            },
        },
    },
    plugins: [
        require('@vidstack/react/tailwind.cjs', {
            // Optimize output by specifying player selector.
            selector: '.resource-viewer',
        }),
    ],
    darkMode: 'selector',
};
