import { useRecoilValue, useSetRecoilState } from 'recoil';
import { analyticsState } from '../recoilState';
import { useRequest } from './useRequest';
import { useTranslations } from './useTranslations';
import { useUrl } from './useUrl';
import { SecureStore } from '../helpers/SecureStore';

export const useAnalytics = () => {
    const analytics = useRecoilValue(analyticsState);
    const setAnalytics = useSetRecoilState(analyticsState);
    const { request } = useRequest();
    const { currentLanguage } = useTranslations();
    const { url } = useUrl();

    return {
        sendVisit: async ({
            codeId,
            usedCodeDialog = false,
            language,
            platform,
        }) => {
            if (url.preview) {
                console.log('Preview mode. No visit is SENT');
                return;
            }

            if (
                SecureStore.get('visit') === (codeId || -1) &&
                SecureStore.get('visitId') > 0
            ) {
                return;
            }

            const body = {
                platform,
                code_id: codeId || null,
                used_code_dialog: usedCodeDialog,
            };

            const requestObject = {
                url: 'analyticsVisit',
                api: 'public',
                method: 'post',
                language: language || currentLanguage.code,
                body,
            };

            SecureStore.set('visit', codeId || -1, 1);

            await request(requestObject, false, (data) => {
                SecureStore.set('visitId', data.data.id, 1);

                setAnalytics({
                    visitId: data.data.id,
                });
            });
        },
        sendResource: async (resourceId) => {
            if (url.preview) {
                console.log('Preview mode. No resource stat is SENT');
                return;
            }

            const requestObject = {
                url: 'analyticsResource',
                api: 'public',
                method: 'post',
                language: currentLanguage.code,
                body: {
                    resource_id: resourceId,
                    parent_id: analytics.visitId,
                },
            };

            await request(requestObject);
        },
    };
};
