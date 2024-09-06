import React, { useEffect, useState } from 'react';
import { Tooltip } from './index';
import '../../base.css';
import { Button } from '../Button';

export default {
    title: 'Components/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
};

export const Primary = () => {
    return (
        <Tooltip message="This is a message">
            <Button>Hover me</Button>
        </Tooltip>
    );
};
