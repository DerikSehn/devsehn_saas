import { useEffect } from 'react';
import { driver } from 'driver.js';

interface TourStep {
    element: string;
    popover: {
        title: string;
        description: string;
    };
}

interface UseTourOptions {
    steps?: TourStep[];
    animate?: boolean;
    doneBtnText?: string;
    nextBtnText?: string;
    prevBtnText?: string;
    onDestroyed?: () => void;
}

export const useTour = ({
    steps = [],
    animate = true,
    doneBtnText = 'Fechar',
    nextBtnText = 'Próximo',
    prevBtnText = 'Anterior',
    onDestroyed = () => {
        localStorage.setItem('tourSeenEditor', 'true');
    }
}: UseTourOptions) => {
    useEffect(() => {
        const tourSeen = localStorage.getItem('tourSeenEditor');
        if (!tourSeen) {
            driver({
                animate,
                doneBtnText,
                nextBtnText,
                prevBtnText,
                steps,
                onDestroyed
            }).drive();
        }
    }, [animate, doneBtnText, nextBtnText, prevBtnText, steps, onDestroyed]);
};