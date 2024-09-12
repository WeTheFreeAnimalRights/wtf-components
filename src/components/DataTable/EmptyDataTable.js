import { sample } from 'lodash';
import {
    Cat,
    Dog,
    Bird,
    Fish,
    Rabbit,
    Rat,
    Squirrel,
    Turtle,
} from 'lucide-react';
import { useTranslations } from '../../hooks/useTranslations';

import { TableCaption } from '_/components/table';

export const EmptyDataTable = () => {
    const animalIcons = [Cat, Dog, Bird, Fish, Rabbit, Rat, Squirrel, Turtle];
    const AnimalIcon = sample(animalIcons);

    const { t } = useTranslations();
    return (
        <TableCaption>
            <div className="text-center px-8 py-12">
                <AnimalIcon className="w-24 h-24 mx-auto" />
                <h1 className="mt-3 text-2xl font-semibold">{t('No Data')}</h1>
                <p className="text-gray-500 mt-2">
                    {t("We couldn't find any data")}
                </p>
                <p className="text-gray-500">
                    {t('Refine your search and/or filters')}
                </p>
            </div>
        </TableCaption>
    );
};
