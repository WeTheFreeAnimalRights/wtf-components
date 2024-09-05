export const getFits = (buttonRef, menuRef) => {
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const iframeDocument = buttonRef.current.ownerDocument;
    const menuRect = menuRef.current.getBoundingClientRect();

    const space = {
        width: iframeDocument.documentElement.clientWidth,
        height: iframeDocument.documentElement.clientHeight,
        top: buttonRect.top,
        bottom: iframeDocument.documentElement.clientHeight - buttonRect.bottom,
        left: buttonRect.left,
        right: iframeDocument.documentElement.clientWidth - buttonRect.right,
    };

    return (position) => {
        // console.log('>>position', position);
        // console.log('>>space', space);
        // console.log('>>buttonRect', buttonRect);
        // console.log('>>menuRect', menuRect);
        switch (position) {
            case 'top-top-left':
                return (
                    space.top >= menuRect.height &&
                    space.width >= buttonRect.x + menuRect.width
                );
            case 'top-top-right':
                return (
                    space.top >= menuRect.height &&
                    buttonRect.right >= menuRect.width
                );
            case 'right-top-right':
                return (
                    space.height >= buttonRect.y + menuRect.height &&
                    space.right >= menuRect.width
                );
            case 'right-bottom-right':
                return (
                    buttonRect.bottom >= menuRect.height &&
                    space.right >= menuRect.width
                );
            case 'bottom-bottom-right':
                return (
                    space.bottom >= menuRect.height &&
                    buttonRect.right >= menuRect.width
                );
            case 'bottom-bottom-left':
                return (
                    space.bottom >= menuRect.height &&
                    space.width >= buttonRect.x + menuRect.width
                );
            case 'left-botttom-left':
                return (
                    buttonRect.bottom >= menuRect.height &&
                    space.left >= menuRect.width
                );
            case 'left-top-left':
                return (
                    buttonRect.y + menuRect.height >= space.height &&
                    space.left >= menuRect.width
                );
            default:
                return false;
        }
    };
};
