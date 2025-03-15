import { isFunction, map } from 'lodash-es';
import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { Resource } from '../../Resource';
import { textContains } from '../../../helpers/textContains';
import { TextInput } from '../../TextInput';
import { useTranslations } from '../../../hooks/useTranslations';
import { Empty } from '../../Empty';
import { ToggleGroupInput } from '../../ToggleGroupInput';
import { Button } from '../../Button';

export const ResourcesChatPlugin = ({ resources, onSelect, onCancel }) => {
    const { t } = useTranslations();
    const [searchText, setSearchText] = useState('');
    const [selectedTypes, setSelectedTypes] = useState([]);
    const allResources =
        selectedTypes.length > 0
            ? selectedTypes.reduce(
                  (result, singleType) => [
                      ...result,
                      ...resources.byType[singleType],
                  ],
                  []
              )
            : resources.all;

    const filtered = allResources.filter((item) =>
        textContains(searchText, [String(item.title), String(item.description)])
    );

    const types = [
        {
            value: 'video',
            label: t('resources-tab-videos'),
        },
        {
            value: 'documentary',
            label: t('resources-tab-documentaries'),
        },
        {
            value: 'challenge',
            label: t('resources-tab-challenges'),
        },
        {
            value: 'website',
            label: t('resources-tab-websites'),
        },
        {
            value: 'app',
            label: t('resources-tab-apps'),
        },
        {
            value: 'book',
            label: t('resources-tab-books'),
        },
    ];

    return (
        <div className="h-96 flex flex-col">
            <div className="mb-2 flex flex-row items-center gap-2">
                <TextInput
                    innerLeftContent={<Search className="w-4 h-4" />}
                    autoFocus
                    placeholder={t('resources-chat-plugin-search')}
                    className="flex-grow"
                    maxLength={100}
                    onChange={(event) => setSearchText(event.target.value)}
                />

                <Button
                    variant="gray"
                    size="small-icon"
                    type="submit"
                    onClick={onCancel}
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>
            <div className="mb-2">
                <ToggleGroupInput
                    options={types}
                    showLabel
                    value={selectedTypes}
                    onChange={setSelectedTypes}
                    className="block items-center overflow-auto w-full flex-nowrap whitespace-nowrap"
                    itemClassName="me-2"
                />
            </div>
            <div className="flex-grow overflow-auto">
                {filtered.length > 0 && (
                    <ul className="grid gap-2 items-stretch">
                        {map(filtered, (item) => {
                            return (
                                <li
                                    className="break-before-column flex items-stretch"
                                    key={item.id}
                                >
                                    <Resource
                                        className="flex-grow"
                                        image={item.image}
                                        imageFit="contain"
                                        imageLoading="lazy"
                                        title={item.title}
                                        description={item.description}
                                        size="sm"
                                        layout="horizontal"
                                        descriptionClassName="line-clamp-2"
                                        onClick={() => {
                                            if (isFunction(onSelect)) {
                                                onSelect(item);
                                            }
                                        }}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                )}
                {filtered.length <= 0 && (
                    <Empty hideIcon>{t('no-resources-found')}</Empty>
                )}
            </div>
        </div>
    );
};
