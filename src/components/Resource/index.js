import { Card } from '../Card';

export const Resource = ({
    title,
    image,
    description,
    onClick,
    size,
    layout = 'vertical',
    highlighted = false,
    imageClassName,
    customizer = false,
    ...props
}) => {
    return (
        <Card
            image={image}
            imageClassName={imageClassName}
            title={title}
            description={description}
            layout={layout}
            highlighted={highlighted}
            size={size}
            onClick={onClick}
            customizer={customizer}
            {...props}
        />
    );
};
