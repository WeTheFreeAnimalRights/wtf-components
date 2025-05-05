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
                            <ol className="list-decimal ps-5 text-sm">
                                {item.items.map((indication, index) => (
                                    <li
                                        key={`indication-${index}`}
                                        className="mb-4"
                                    >
                                        <h2 className="font-semibold">
                                            {indication.title}
                                        </h2>
                                        <p className="text-muted-foreground">
                                            {indication.description}
                                        </p>
                                    </li>
                                ))}
                            </ol>
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
                                            {objection.title}
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
