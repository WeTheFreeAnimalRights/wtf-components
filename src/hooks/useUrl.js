import { isString, isUndefined } from 'lodash-es';
import { useMatches, useSearchParams, useNavigate } from 'react-router-dom';
import { validateCode } from '../helpers/validateCode';
import { getUrl } from '../helpers/getUrl';
import { SecureStore } from '../helpers/SecureStore';
import { getDefaultLanguage } from '../helpers/getDefaultLanguage';
import { getDefaultCode } from '../helpers/getDefaultCode';

export const useUrl = () => {
    const [urlMatches] = useMatches();
    const params = urlMatches.params || {};

    // Language and code
    let language = SecureStore.get('language') || getDefaultLanguage();
    let code = SecureStore.get('code') || getDefaultCode().code;

    // Is preview
    const [searchParams] = useSearchParams();
    const preview = Boolean(parseInt(searchParams.get('preview')));

    // If nothing is passed
    if (isString(params.language)) {
        if (
            params.language.length === 5 &&
            validateCode(params.language) === true
        ) {
            code = params.language;
        } else {
            language = params.language;
        }

        if (isString(params.code)) {
            language = params.language;

            if (validateCode(params.code) === true) {
                code = params.code;
            }
        }
    }

    // Navigate to new url
    const navigate = useNavigate();
    const setUrl = (data, ...params) => {
        const newUrl = getUrl(
            isUndefined(data.language) ? language : data.language,
            isUndefined(data.code) ? code : data.code,
            isUndefined(data.preview) ? preview : data.preview
        );
        navigate(newUrl, ...params);
    };

    return {
        url: {
            language,
            code,
            preview,
        },
        currentUrl: getUrl(language, code, preview),
        setUrl,
    };
};
