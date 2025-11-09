import { parseJson } from "../../../helpers/parseJson";

export const parseMessage = (item) => {
    return parseJson(item.message);
};
