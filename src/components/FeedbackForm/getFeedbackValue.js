import { SecureStore } from '../../store/SecureStore';
import { getFeedbackKey } from './getFeedbackKey';

export const getFeedbackValue = (resourceId, code) => {
    return SecureStore.get(getFeedbackKey(resourceId, code));
};
