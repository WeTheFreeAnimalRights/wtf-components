import Markdown from 'react-markdown';
import { isFunction } from 'lodash-es';
import { Button } from '../../Button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '_/components/tabs';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '_/components/accordion';

export const PromptsChatPlugin = ({ onSelect, items }) => {
    const handleSelect = (item) => {
        if (isFunction(onSelect)) {
            onSelect(item);
        }
    };

    return (
        <div className="h-96">
            <Tabs
                defaultValue={items[0].name}
                className="flex flex-col h-full"
            >
                <TabsList className="block mb-3  items-center overflow-x-auto w-full flex-nowrap whitespace-nowrap p-0">
                    {items.map((item) => (
                        <TabsTrigger value={item.name} key={`tab-${item.name}`}>
                            {item.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {items.map((item) => (
                    <TabsContent
                        value={item.name}
                        className="mt-0 overflow-auto flex-grow basis-0"
                        key={`content-${item.name}`}
                    >
                        {item.type === 'questions' && (
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
                        {item.type === 'objectionHandling' && (
                            <div className="text-sm">
                            <Markdown components={{
                                h3: ({ node, ...rest }) => {
                                    return (
                                        <h3
                                            className={`font-semibold mt-4 mb-2 first:mt-0`}
                                            {...rest}
                                        />
                                    );
                                },
                                p: ({ node, ...rest }) => {
                                    return (
                                        <p
                                            className={`text-muted-foreground`}
                                            {...rest}
                                        />
                                    );
                                },
                            }}>
                            {item.value}
                        </Markdown>
                        </div>
                        )}
                        {item.type === 'objections' && (
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                            >
                                {item.items.map((objection, index) => (
                                    <AccordionItem
                                        key={`objection-${index}`}
                                        value={`objection-${index}`}
                                    >
                                        <AccordionTrigger>
                                            {objection.name}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {objection.items.map(
                                                (subitem, subindex) => (
                                                    <Button
                                                        key={`objection-${index}-${subindex}`}
                                                        variant="gray"
                                                        className="h-auto w-full text-start whitespace-normal items-start justify-start mb-2 bg-gray-200 hover:bg-gray-200/80"
                                                        onClick={() =>
                                                            handleSelect(
                                                                subitem
                                                            )
                                                        }
                                                    >
                                                        {subitem}
                                                    </Button>
                                                )
                                            )}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        )}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};
