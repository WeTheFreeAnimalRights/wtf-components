import { isFunction } from 'lodash-es';
import {
    Bell,
    Calendar,
    MessageCircle,
    Newspaper,
    Presentation,
    QrCode,
    Users,
} from 'lucide-react';
import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../Button';
import { Empty } from '../Empty';
import { Badge } from '../Badge';
import { useNotifications } from '../../hooks/useNotifications';
import { useTranslations } from '../../hooks/useTranslations';
import { formatTimeAgo } from '../../helpers/formatTimeAgo';
import { getNewCount } from './getNewCount';

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from '_/components/dropdown-menu';
import { cn } from '_/lib/utils';

export const NotificationsDropdown = ({
    onSelect,
    onMore,
    className,
    variant = 'ghost',
    size = 'icon',
    align = 'center',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslations();
    const { notifications } = useNotifications();

    const limit = 5;

    const _items = [
        {
            message: "There's a new chat",
            type: 'chats',
            isNew: true,
            url: '/chats',
            date: new Date(),
        },
        {
            message: 'Your code is expiring',
            type: 'codes',
            isNew: true,
            url: '/codes',
            date: new Date('05/26/2025'),
        },
        {
            message: 'There is another announcement',
            type: 'announcements',
            isNew: false,
            url: '/announcements',
            date: new Date('05/20/2025'),
        },
        {
            message: 'New event in Amsterdam, Netherlands coming soon',
            type: 'events',
            isNew: false,
            url: '/events',
            date: new Date('05/20/2025'),
        },
        {
            message: 'MyChats has now launched',
            type: 'chats',
            isNew: false,
            url: '/chats',
            date: new Date('05/15/2025'),
        },
        {
            message:
                'Training for how to do outreach the right way is now live',
            type: 'trainings',
            isNew: false,
            url: '/trainings',
            date: new Date('05/01/2025'),
        },
    ];

    const newItems = getNewCount(_items);
    const notificationItems = _items.slice(0, limit);
    const moreNotifications = _items.length > limit;

    return (
        <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
            <DropdownMenuTrigger size={size} asChild>
                <Button variant={variant} className={cn('relative', className)}>
                    <div className="relative">
                        <Bell className="w-4 h-4" />
                        {newItems > 0 && (
                            <Badge variant="simple" className="absolute -end-[12px] -top-[12px] px-1.5">
                                {newItems}
                            </Badge>
                        )}
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={align}>
                <DropdownMenuLabel>
                    {t('notifications-title')}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notificationItems.length === 0 && (
                    <Empty title={t('empty-notifications-title')}>
                        {t('empty-notifications-description')}
                    </Empty>
                )}
                {notificationItems.map((item, index) => (
                    <DropdownMenuItem
                        className={cn(
                            'cursor-pointer',
                            item.isNew && 'bg-muted/50 mb-1'
                        )}
                        key={`item-${index}`}
                        onSelect={(e) => {
                            if (isFunction(onSelect)) {
                                onSelect(item, e);
                            }
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-row items-center justify-between w-full p-2">
                            <div className="w-6 h-6 me-4">
                                {item.type === 'codes' && (
                                    <QrCode className="w-6 h-6" />
                                )}
                                {item.type === 'events' && (
                                    <Calendar className="w-6 h-6" />
                                )}
                                {item.type === 'trainings' && (
                                    <Presentation className="w-6 h-6" />
                                )}
                                {item.type === 'teams' && (
                                    <Users className="w-6 h-6" />
                                )}
                                {item.type === 'chats' && (
                                    <MessageCircle className="w-6 h-6" />
                                )}
                                {item.type === 'announcements' && (
                                    <Newspaper className="w-6 h-6" />
                                )}
                            </div>
                            <div className="flex flex-grow flex-col me-2 max-w-[200px]">
                                <div className="text-md text-gray-900 group-hover:text-white dark:text-gray-100 dark:group-hover:text-white">
                                    {item.message}
                                </div>
                                <div className="text-xs text-gray-400 group-hover:text-gray-300 dark:text-gray-600">
                                    {formatTimeAgo(item.date)}
                                </div>
                            </div>
                            <div
                                className={cn(
                                    'w-2 h-2 rounded-full bg-transparent',
                                    item.isNew && 'bg-wtf-pink'
                                )}
                            />
                        </div>
                    </DropdownMenuItem>
                ))}
                {moreNotifications && (
                    <Fragment>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onSelect={(e) => {
                                if (isFunction(onMore)) {
                                    onMore(e);
                                }
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-md text-gray-900 group-hover:text-white dark:text-gray-100 dark:group-hover:text-white">
                                {t('notifications-view-more')}
                            </div>
                        </DropdownMenuItem>
                    </Fragment>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

NotificationsDropdown.displayName = 'NotificationsDropdown';
NotificationsDropdown.propTypes = {
    /**
     * Whether to show a badge or not
     */
    badge: PropTypes.number,

    /**
     * Optional when a notification is clicked
     */
    onSelect: PropTypes.func,
};
