import { AnimalIcon } from '../../AnimalIcon';

export const ParticipantNoCamera = ({ name, animalIndex = 2 }) => {
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-2 py-4 box-border">
            <AnimalIcon variant="light" index={animalIndex} />
            <div className="bg-background/80 py-1 px-2 rounded-md inline-block text-sm">
                {name}
            </div>
        </div>
    );
};
