import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import useHandleClickAway from './use-handle-click-away';
import { isFunction } from 'lodash';

type DrawerProps = {
    isOpen?: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    anchor: 'left' | 'right' | 'top' | 'bottom';
    className?: string;
    clickArea?: React.ReactNode;
};

const Drawer = ({ isOpen, onClose, children, anchor, className, clickArea }: DrawerProps) => {
    const [animationComplete, setAnimationComplete] = useState(false);

    const [isAreaOpen, toggleOpen] = useState(isOpen);
    const handleClose = () => {
        toggleOpen(!isAreaOpen);
        if (isFunction(onClose)) {
            onClose();
        }
    }


    const handleAnimationComplete = () => {
        setAnimationComplete(true);
    };

    const getDrawerStyles = () => {
        switch (anchor) {
            case 'left':
                return 'inset-y-0 left-0 w-64';
            case 'right':
                return 'inset-y-0 right-0 w-64';
            case 'top':
                return 'inset-x-0 top-0 h-64';
            case 'bottom':
                return 'inset-x-0 bottom-0 h-64';
            default:
                return '';
        }
    };

    const getAnimation = () => {
        switch (anchor) {
            case 'left':
                return { x: 0, transition: { duration: 0.2 } };
            case 'right':
                return { x: 0, transition: { duration: 0.2 } };
            case 'top':
                return { y: 0, transition: { duration: 0.2 } };
            case 'bottom':
                return { y: 0, transition: { duration: 0.2 } };
            default:
                return {};
        }
    };

    const getInitialAnimation = () => {
        switch (anchor) {
            case 'left':
                return { x: '-100%' };
            case 'right':
                return { x: '100%' };
            case 'top':
                return { y: '-100%' };
            case 'bottom':
                return { y: '100%' };
            default:
                return {};
        }
    };

    const getExitAnimation = () => {
        switch (anchor) {
            case 'left':
                return { x: '-100%' };
            case 'right':
                return { x: '100%' };
            case 'top':
                return { y: '-100%' };
            case 'bottom':
                return { y: '100%' };
            default:
                return {};
        }
    };
    useHandleClickAway('.drawer-content', handleClose, isAreaOpen)

    return (
        <AnimatePresence>
            {clickArea ? (
                /* @ts-ignore */
                React.cloneElement(clickArea, { onClick: handleClose })
            ) : null}
            {isAreaOpen && (
                <motion.div
                    className={twMerge(`drawer-content overflow-y-auto fixed ${getDrawerStyles()} bg-neutral-100 border-neutral-200 border shadow-lg z-50 `, className)}
                    initial={getInitialAnimation()}
                    animate={getAnimation()}
                    exit={getExitAnimation()}
                    onAnimationComplete={handleAnimationComplete}
                >
                    {animationComplete && children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Drawer;
