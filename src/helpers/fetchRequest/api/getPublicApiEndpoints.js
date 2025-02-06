export const getPublicApiEndpoints = () => {
    return {
        /**
         * Endpoint to validate code
         */
        validateCode: '/codes',

        /**
         * Endpoint to fetch all available languages
         */
        languages: '/locales',

        /**
         * Endpoint to fetch all translations
         */
        translations: '/contents',

        /**
         * Endpoint to fetch highlighted resources based on code
         */
        highlighted: '/resources/highlighted',

        /**
         * Endpoint to fetch home resources based on code
         */
        resources: '/resources',

        /**
         * Endpoint to fetch feedback options
         */
        feedback: '/feedback-options',

        /**
         * Endpoint to post the petitions
         */
        petitions: '/petitions',

        /**
         * Analytics
         */
        analyticsVisit: '/analytics/visits',
        analyticsResource: '/analytics/resource-accessed',
    };
};
