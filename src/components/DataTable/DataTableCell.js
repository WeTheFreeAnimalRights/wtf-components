import { X, Check } from 'lucide-react';
import { renderCell } from './helpers/renderCell';
import { Badge } from '../Badge';

// ShadCN
import { TableCell } from '_/components/table';
import { isFunction, isUndefined } from 'lodash';

export const DataTableCell = ({ field, item, onClick }) => {
    const value = renderCell(field, item);

    const variant = isUndefined(field.variant)
        ? 'simple'
        : isFunction(field.variant)
          ? field.variant(item[field.name])
          : field.variant;

    return (
        <TableCell className={field.className} onClick={onClick}>
            {(field.type === 'badge' && (
                <Badge variant={variant} className="inline-block">
                    {value}
                </Badge>
            )) ||
                (field.type === 'small-text' && (
                    <div className="text-xs line-clamp-2">{value || '-'}</div>
                )) ||
                (field.type === 'boolean' &&
                    (value ? (
                        <Check className="inline-block" />
                    ) : (
                        <X className="inline-block" />
                    ))) ||
                value}
        </TableCell>
    );
};
