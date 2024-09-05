export const getButtonClasses = ({ full, theme }) => {
    return {
        wrapper: `inline-block group cursor-pointer
            ${full ? 'w-full' : ''}
            ${theme === 'full' ? 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 disabled:bg-gray-300 dark:disabled:bg-gray-700 dark:disabled:text-gray-500' : ''}
            ${theme === 'half' ? 'border border-gray-200 bg-white hover:bg-gray-100 focus:ring-gray-100 disabled:bg-gray-200 disabled:text-gray-700 dark:disabled:bg-gray-700 dark:disabled:text-gray-500' : ''}
            ${theme === 'half-empty' ? 'bg-white hover:bg-gray-100 focus:ring-gray-100 disabled:bg-gray-200 disabled:text-gray-700 dark:disabled:bg-gray-700 dark:disabled:text-gray-500' : ''}
            ${theme === 'empty' ? 'rounded-md' : ''}
            ${theme === 'wtf-pink' ? 'bg-wtf-pink hover:bg-gray-900 focus:ring-wtf-pink' : ''}
            focus:ring-4 focus:outline-none
            font-medium text-sm
            text-center cursor-pointer disabled:cursor-not-allowed
            ${theme === 'full' ? 'rounded-lg px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : ''}
            ${theme === 'half' ? 'rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-600' : ''}
            ${theme === 'half-empty' ? 'rounded-lg p-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600' : ''}
            ${theme === 'wtf-pink' ? 'rounded-full px-8 py-3' : ''}`,
        text: `
            ${theme === 'full' ? 'text-white' : ''}
            ${theme === 'half' ? 'text-gray-900 group-hover:text-blue-700 dark:text-gray-400 dark:group-hover:text-white' : ''}
            ${theme === 'half-empty' ? 'text-gray-900 group-hover:text-blue-700 dark:text-gray-400 dark:group-hover:text-white' : ''}
            ${theme === 'empty' ? 'underline text-black hover:text-blue-700 dark:text-gray-400 group-hover:text-blue-700 dark:group-hover:text-white group-disabled:no-underline group-disabled:text-gray-500 dark:group-disabled:text-gray-500' : ''}
            ${theme === 'wtf-pink' ? 'text-white' : ''}
        `,
    };
};
