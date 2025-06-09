import { MessagesSquare, Bookmark, Mic, Heart, Bot } from 'lucide-react';
import { getCDNUrl } from '../../helpers/getCDNUrl';
import { useTranslations } from '../../hooks/useTranslations';
import { Modal, ModalContainer } from '../Modal';
import { IconWrapper } from '../IconWrapper';
import { Button } from '../Button';

export const DiscordModal = ({ open, onOpenChange }) => {
    const { t } = useTranslations();
    const discordLink = 'https://discord.com/invite/yQuHz43HPv';
    const discordSplashUrl = getCDNUrl('_static/discord-splash.jpg');

    return (
        <ModalContainer open={open} onOpenChange={onOpenChange}>
            <Modal
                title={
                    <div className="px-6 pt-6 space-y-0">
                        {t('discord-modal-title')}
                    </div>
                }
                className="w-10/12 sm:w-2/3 lg:w-[900px] p-0"
                setWidth={false}
            >
                <div className="p-6 pt-2 flex flex-col-reverse sm:flex-row items-stretch justify-items-stretch">
                    <div className="flex-grow basis-0 text-sm pe-4">
                        <p>{t('discord-modal-description')}</p>

                        <ul className="mt-4">
                            <li className="flex flex-row items-start">
                                <IconWrapper color="pink" className="me-2">
                                    <MessagesSquare className="w-4 h-4" />
                                </IconWrapper>
                                <div className="pt-1">
                                    {t('discord-modal-livechat')}
                                </div>
                            </li>
                            <li className="flex flex-row items-start mt-2">
                                <IconWrapper color="pink" className="me-2">
                                    <Bookmark className="w-4 h-4" />
                                </IconWrapper>
                                <div className="pt-1">
                                    {t('discord-modal-resources')}
                                </div>
                            </li>
                            <li className="flex flex-row items-start mt-2">
                                <IconWrapper color="pink" className="me-2">
                                    <Mic className="w-4 h-4" />
                                </IconWrapper>
                                <div className="pt-1">
                                    {t('discord-modal-live-events')}
                                </div>
                            </li>
                            <li className="flex flex-row items-start mt-2">
                                <IconWrapper color="pink" className="me-2">
                                    <Heart className="w-4 h-4" />
                                </IconWrapper>
                                <div className="pt-1">
                                    {t('discord-modal-peer-support')}
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="w-full mb-4 sm:mb-0 sm:w-1/3">
                        <img
                            src={discordSplashUrl}
                            alt=""
                            draggable="false"
                            className="w-full h-[120px] sm:h-full object-cover"
                        />
                    </div>
                </div>

                <div className="bg-gray-100 p-6 border-t border-gray-300 dark:bg-gray-900 dark:border-gray-500">
                    <Button
                        className="w-full"
                        asChild
                        onClick={() => onOpenChange(false)}
                    >
                        <a href={discordLink} target="_blank" rel="noreferrer">
                            <Bot className="w-4 h-4 me-2" />
                            {t('discord-modal-button-join')}
                        </a>
                    </Button>
                </div>
            </Modal>
        </ModalContainer>
    );
};
