import React, { useState } from 'react';
import { BigTab } from './BigTab';
import './style.css';
import { TabButton } from './TabButton';

export const BigTabs = ({ children }) => {
    const [selected, setSelected] = useState(0);

    return (
        <>
            <div className="border-b border-gray-200 dark:border-gray-700 relative width-full overflow-x-auto">
                <ul className="grid grid-cols-6 justify-items-stretch justify-stretch items-stretch text-sm font-medium text-center text-gray-500 rounded-lg shadow flex items-stretch dark:divide-gray-700 dark:text-gray-400 min-w-[800px]">
                    {children.map((child, index) => {
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

            <div className="mt-6">
                {(children || []).map((child, index) => (
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
