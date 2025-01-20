import { useState } from 'react';
import { Skeleton } from '_/components/skeleton';
import { cn } from '_/lib/utils';
import { AnimalIcon } from '../AnimalIcon';
import { useTranslations } from '../../hooks/useTranslations';
import { isFunction } from 'lodash-es';

export const Image = ({
    src = '',
    alt = '',
    className = '',
    textClassName,
    iconVariant,
    ...props
}) => {
    const { t } = useTranslations();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <>
            {loading && <Skeleton className={['w-full h-full', className]} />}

            {error && (
                <div
                    className={cn(
                        'w-full h-full min-h-100px min-w-100px text-center items-center justify-center flex flex-row bg-destructive overflow-hidden',
                        className
                    )}
                >
                    <div>
                        <AnimalIcon
                            className={cn('w-8 h-8 mx-auto text-white')}
                            variant={iconVariant || 'light'}
                        />
                        <div className={cn('text-white', textClassName)}>
                            {t('no-image')}
                        </div>
                    </div>
                </div>
            )}

            <img
                src={src}
                alt={alt}
                className={cn(
                    loading && 'hidden',
                    error && 'hidden',
                    className
                )}
                {...props}
                onLoad={(...loadProps) => {
                    setLoading(false);
                    setError(false);

                    // If there is a function passed, use that
                    if (isFunction(props.onLoad)) {
                        props.onLoad(...loadProps);
                    }
                }}
                onError={(...errorProps) => {
                    setLoading(false);
                    setError(true);

                    // If there is a function passed, use that
                    if (isFunction(props.onError)) {
                        props.onError(...errorProps);
                    }
                }}
            />
        </>
    );
};
