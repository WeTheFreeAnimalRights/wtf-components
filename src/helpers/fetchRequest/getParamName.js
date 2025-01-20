import { snakeCase } from 'lodash-es';

export const getParamName = (name = '') => {
    return name
        .split('[')
        .map((part1) =>
            part1
                .split(']')
                .map(
                    (part2) => (part2[0] === '_' ? '_' : '') + snakeCase(part2)
                )
                .join(']')
        )
        .join('[');
};
