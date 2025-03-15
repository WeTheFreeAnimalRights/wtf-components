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
import { _getPrompts } from './_getPrompts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '_/components/tabs';

export const PromptsChatPlugin = ({ onSelect, onCancel }) => {
    const prompts = _getPrompts();

    const handleSelect = (item) => {
        if (isFunction(onSelect)) {
            onSelect(item);
        }
    };

    return (
        <div className="h-96">
            <Tabs
                defaultValue={prompts[0].name}
                className="flex flex-col h-full"
            >
                <TabsList className="block mb-3  items-center overflow-x-auto w-full flex-nowrap whitespace-nowrap p-0">
                    {prompts.map((item) => (
                        <TabsTrigger value={item.name} key={`tab-${item.name}`}>
                            {item.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {prompts.map((item) => (
                    <TabsContent
                        value={item.name}
                        className="mt-0 overflow-auto flex-grow basis-0"
                        key={`content-${item.name}`}
                    >
                        {item.type === 'prompts' && (
                            <div>
                                {item.items.map((category, index) => (
                                    <div
                                        key={`prompt-category-${index}`}
                                        className="mb-2"
                                    >
                                        <h2 className="text-muted-foreground uppercase text-sm mb-1">
                                            {category.name}
                                        </h2>
                                        {category.items.map(
                                            (subitem, subindex) => (
                                                <Button
                                                    key={`prompt-${index}-${subindex}`}
                                                    variant="gray"
                                                    className="h-auto w-full text-start whitespace-normal items-start justify-start mb-2 bg-gray-200 hover:bg-gray-200/80"
                                                    onClick={() =>
                                                        handleSelect(subitem)
                                                    }
                                                >
                                                    {subitem}
                                                </Button>
                                            )
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        {item.type === 'indications' && (
                            <ol className='list-decimal ps-5 text-sm'>
                                {item.items.map((indication, index) => (
                                    <li key={`indication-${index}`} className='mb-4'>
                                        <h2 className='font-semibold'>{indication.title}</h2>
                                        <p className='text-muted-foreground'>{indication.description}</p>
                                    </li>
                                ))}
                            </ol>
                        )}
                        {item.type === 'objections' && (
                            <ul>
                                {item.items.map((objection, index) => (
                                    <li key={`objection-${index}`}>
                                        <h2>{objection.title}</h2>
                                        <Button
                                            key={`objection-${index}`}
                                            onClick={() =>
                                                handleSelect(
                                                    objection.description
                                                )
                                            }
                                        >
                                            {objection.description}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};
