import { snakeCase } from 'lodash';

export const getParamName = (name = '') => {
    return name
        .split('[')
        .map((part1) =>
            part1
                .split(']')
                .map((part2) => snakeCase(part2))
                .join(']')
        )
        .join('[');
};
