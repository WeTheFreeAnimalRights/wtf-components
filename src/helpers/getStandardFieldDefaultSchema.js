export const getStandardFieldDefaultSchema = () => {
    return {
        // text, email, password, country, code, boolean, select
        type: 'text',

        // Name of the field
        name: undefined,

        // Default value of the field
        defaultValue: undefined,

        // If it's optional, then validation will ignore it if empty
        optional: false,

        // If there is a confirmation, then it has to match another field
        confirmation: false,

        // Name to be sent to the server - by default it's snake cased
        serverName: undefined,

        // Whether to include the field in the request to the server
        includeInRequest: true,

        // Whether to even validate this field or not
        validate: true,

        // This is a custom rule to validate numbers
        minimum: false,
    };
};
