import { _config } from './config';

export const getApiConfig = (name = 'public') => {
    if (!_config[name]) {
        throw new Error(
            `API "${name}" not setup. Please run \`setupApi\` to set it up`
        );
    }

    if (!_config[name].base) {
        throw new Error(`Base For API "${name}" not setup.`);
    }

    if (!_config[name].endpoints) {
        throw new Error(`Endpoints For API "${name}" not setup.`);
    }

    return _config[name];
};
