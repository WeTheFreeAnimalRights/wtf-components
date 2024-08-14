import { _config } from './config';

export const setupApi = ({ base = '', endpoints = {}, name = 'public' }) => {
    _config[name] = {
        base,
        endpoints,
    };
};
