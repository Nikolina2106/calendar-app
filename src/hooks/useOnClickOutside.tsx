import React, {useEffect} from 'react';

export function useOnClickOutside(ref: React.MutableRefObject<HTMLElement | null>, handler: () => void): void {
    useEffect(() => {
        const listener = (event: Event | TouchEvent): void => {
            // Do nothing if clicking ref's element or descendent elements
            if (!ref.current || ref.current.contains(event.target as Node | null)) {
                return;
            }

            handler();
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
}
