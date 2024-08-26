export const getButtonClasses = ({ full, theme }) => {
    return `
        ${full ? 'w-full' : ''}
        ${theme === 'full' ? 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 disabled:bg-gray-300 dark:disabled:bg-gray-700 dark:disabled:text-gray-500' : ''}
        ${theme === 'half' ? 'border border-gray-200 text-gray-900 hover:text-blue-700 bg-white hover:bg-gray-100 focus:ring-gray-100 disabled:bg-gray-200 disabled:text-gray-700 dark:disabled:bg-gray-700 dark:disabled:text-gray-500' : ''}
        ${theme === 'empty' ? 'underline hover:text-blue-700 disabled:no-underline disabled:text-gray-500 dark:disabled:text-gray-500' : ''}
        ${theme === 'wtf-pink' ? 'text-white bg-wtf-pink hover:bg-gray-900 focus:ring-wtf-pink' : ''}
        focus:ring-4 focus:outline-none
        font-medium text-sm
        text-center cursor-pointer disabled:cursor-not-allowed
        ${theme === 'full' ? 'rounded-lg px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : ''}
        ${theme === 'half' ? 'rounded-lg px-5 py-2.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600' : ''}
        ${theme === 'empty' ? 'rounded-md underline dark:text-gray-400 hover:text-blue-700 dark:hover:text-white' : ''}
        ${theme === 'wtf-pink' ? 'rounded-full px-8 py-3' : ''}
    `
}
