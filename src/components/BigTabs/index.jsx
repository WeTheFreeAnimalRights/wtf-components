import React, { useState } from 'react';
import { BigTab } from './BigTab';
import { TabButton } from './TabButton';
import { cn } from '_/lib/utils';

export const BigTabs = ({ children, className }) => {
    const [selected, setSelected] = useState(0);

    const tabs = React.Children.toArray(children);

    return (
        <>
            <div
                className={cn(
                    'relative width-full overflow-x-auto mb-6',
                    className
                )}
            >
                <ul className="grid grid-cols-6 justify-items-stretch justify-stretch items-stretch text-sm font-medium text-center text-gray-500 rounded-lg shadow flex items-stretch dark:divide-gray-700 dark:text-gray-400 min-w-[800px]">
                    {tabs.map((child, index) => {
                        return (
                            <li
                                className="focus-within:z-10"
                                key={`tab-${index}`}
                            >
                                <TabButton
                                    icon={child.props.icon}
                                    first={index === 0}
                                    last={index === children.length - 1}
                                    selected={index === selected}
                                    onClick={() => setSelected(index)}
                                >
                                    {child.props.name}
                                </TabButton>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div>
                {(tabs || []).map((child, index) => (
                    <BigTab
                        visible={index === selected}
                        key={`tab-content-${index}`}
                    >
                        {child.props.children}
                    </BigTab>
                ))}
            </div>
        </>
    );
};
BigTabs.displayName = 'BigTabs';

BigTabs.propTypes = {};

export { BigTab };
