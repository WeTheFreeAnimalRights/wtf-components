import React, { useState } from 'react';
import { BigTab } from './BigTab';
import './style.scss';
import { TabButton } from './TabButton';

export const BigTabs = ({ children }) => {
    const [selected, setSelected] = useState(0);

    return (
        <>
            <div className="border-b border-gray-200 dark:border-gray-700 relative">
                <ul className="flex flex-row justify-items-stretch justify-stretch items-stretch text-sm font-medium text-center text-gray-500 rounded-lg shadow flex items-stretch dark:divide-gray-700 dark:text-gray-400 overflow-x-auto">
                    {children.map((child, index) => {
                        return (
                            <li
                                className="flex-grow basis-0 focus-within:z-10"
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

                {/* For the gradient on small devices */}
                <div className="absolute end-0 top-0 h-full w-6 bg-gradient-to-r from-gray-300/0 to-gray-300/100" />
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

BigTabs.propTypes = {};

export { BigTab };
