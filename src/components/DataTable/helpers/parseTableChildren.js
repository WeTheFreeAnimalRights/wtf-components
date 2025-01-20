import { isUndefined, snakeCase, startCase } from 'lodash-es';
import { getDefaultColumnProps } from './getDefaultColumnProps';

// Definitions
import { Filters } from '../definitions/Filters';
import { Order } from '../definitions/Order';
import { Search } from '../definitions/Search';
import { TopRight } from '../definitions/TopRight';
import { RowActions } from '../definitions/RowActions';
import { Column } from '../definitions/Column';

export const parseTableChildren = (children = []) => {
    const columns = {};
    let filters = [];
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
        topRight: null,
        rowActions: null,
    };

    const defaultColumnProps = getDefaultColumnProps();

    children.forEach((item) => {
        const { props: allProps = {} } = item || {};
        const { children: itemLabel, ...props } = allProps;

        if (item.type.displayName === Column.displayName) {
            columns[props.name] = {
                ...defaultColumnProps,
                sortable:
                    props.type === 'custom'
                        ? false
                        : defaultColumnProps.sortable,
                serverName: snakeCase(props.name),
                headerClassName: !isUndefined(props.headerClassName)
                    ? props.headerClassName
                    : props.className,
                label: itemLabel || props.label || startCase(props.name),
                ...props,
            };
        }

        if (item.type.displayName === Filters.displayName) {
            filters = filters.concat(item.props.children);
        }

        if (item.type.displayName === Order.displayName) {
            meta.order.field = props.field;
            meta.order.order = props.order;
        }

        if (item.type.displayName === Search.displayName) {
            meta.search.visible = true;
            meta.search.text = itemLabel;
        }

        if (item.type.displayName === TopRight.displayName) {
            meta.topRight = {
                children: itemLabel,
                className: props.className,
            };
        }

        if (item.type.displayName === RowActions.displayName) {
            meta.rowActions = props.render;
        }
    });

    return {
        columns,
        filters,
        meta,
    };
};
