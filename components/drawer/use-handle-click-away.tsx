import { useEffect } from 'react';

export default function useHandleClickAway(ref: any, onClickAway: any, enabled = false) {
    useEffect(() => {
        if (!enabled) return;

        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickAway(event);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, onClickAway, enabled]);
}
