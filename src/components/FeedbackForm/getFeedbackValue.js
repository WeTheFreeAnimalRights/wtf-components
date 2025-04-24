import { SecureStore } from "../../helpers/SecureStore"
import { getFeedbackKey } from "./getFeedbackKey"

export const getFeedbackValue = (resourceId, code) => {
    return SecureStore.get(getFeedbackKey(resourceId, code));
};
