import { AnimalIcon } from '../AnimalIcon';
import { cn } from '_/lib/utils';

export const Empty = ({ title, children, iconClassName }) => {
    return (
        <div className="text-center px-8 py-12">
            <AnimalIcon className={cn('w-24 h-24 mx-auto', iconClassName)} />
            {title && <h1 className="mt-3 text-2xl font-semibold">{title}</h1>}
            <div className="text-gray-500 mt-2">{children}</div>
        </div>
    );
};
