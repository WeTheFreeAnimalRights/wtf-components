import { X, Check } from 'lucide-react';
import { renderCell } from './helpers/renderCell';
import { Badge } from '../Badge';

// ShadCN
import { TableCell } from '_/components/table';

export const DataTableCell = ({ field, item, onClick }) => {
    const value = item[field.name];

    return (
        <TableCell className={field.className} onClick={onClick}>
            {(field.type === 'id' && (
                <Badge variant="secondary" className="inline-block">
                    {value}
                </Badge>
            )) ||
                (field.type === 'description' && (
                    <div className="text-xs line-clamp-2">{value || '-'}</div>
                )) ||
                (field.type === 'boolean' &&
                    (value ? (
                        <Check className="inline-block" />
                    ) : (
                        <X className="inline-block" />
                    ))) ||
                renderCell(field, item)}
        </TableCell>
    );
};
