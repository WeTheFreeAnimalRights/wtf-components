import { colors } from '../../_shadcn/lib/colors';
import { cn } from '../../_shadcn/lib/utils';

export const IconWrapper = ({ className, color = 'gray', children }) => {
    const colorClasses = colors[color] || '';
    return (
        <div
            className={cn(
                'inline-block p-2 rounded-sm',
                colorClasses,
                className
            )}
        >
            {children}
        </div>
    );
};
