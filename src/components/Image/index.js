import { useState } from 'react';
import { isFunction } from 'lodash-es';
import { cn } from '_/lib/utils';
import { AnimalIcon } from '../AnimalIcon';
import { useTranslations } from '../../hooks/useTranslations';
import { getCDNUrl } from '../../helpers/getCDNUrl';

export const Image = ({
    src = '',
    alt = '',
    className = '',
    textClassName,
    iconVariant,
    cdn = false,
    ...props
}) => {
    const { t } = useTranslations();
    const [error, setError] = useState(false);

    // Get the source of the image
    const usedSrc = cdn ? getCDNUrl(src) : src;

    return (
        <>
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
                src={usedSrc}
                alt={alt}
                className={cn(
                    error && 'hidden',
                    className
                )}
                {...props}
                onLoad={(...loadProps) => {
                    setError(false);

                    // If there is a function passed, use that
                    if (isFunction(props.onLoad)) {
                        props.onLoad(...loadProps);
                    }
                }}
                onError={(...errorProps) => {
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
