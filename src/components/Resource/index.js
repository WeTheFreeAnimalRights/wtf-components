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
        />
    );
};
