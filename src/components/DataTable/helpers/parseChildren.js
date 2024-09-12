import { snakeCase, startCase } from 'lodash';
import { getDefaultColumnProps } from './getDefaultColumnProps';

export const parseChildren = (children = []) => {
    const columns = {};
    const filters = {};
    const meta = {
        order: {
            field: '',
            order: '',
        },
        search: {
            visible: false,
            text: '',
        },
        filters: {},
    };

    const defaultColumnProps = getDefaultColumnProps();

    children.forEach((item) => {
        const { props: allProps = {} } = item || {};
        const { children: itemLabel, ...props } = allProps;

        if (item.type.displayName === 'Column') {
            columns[props.name] = {
                ...defaultColumnProps,
                sortable: props.type === 'custom' ? false : defaultColumnProps.sortable,
                serverName: snakeCase(props.name),
                label: itemLabel || props.label || startCase(props.name),
                ...props,
            };
        }

        if (item.type.displayName === 'Filter') {
            const { value, ...remainingProps } = props;
            filters[props.name] = {
                ...remainingProps,
                label: itemLabel || props.label,
            };
            if (value) {
                meta.filters[props.name] = value;
            }
        }

        if (item.type.displayName === 'Order') {
            meta.order.field = props.field;
            meta.order.order = props.order;
        }

        if (item.type.displayName === 'Search') {
            meta.search.visible = true;
            meta.search.text = itemLabel;
        }
    });

    return {
        columns,
        filters,
        meta,
    };
};
