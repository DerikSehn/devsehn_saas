'use client'

import React, { useState, createContext, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils';

const DirectionContext = createContext<{
    direction: 'rtl' | 'ltr' | null
    setAnimationDirection: (tab: number | null) => void
} | null>(null)

const CurrentTabContext = createContext<{
    currentTab: number | null
} | null>(null)

export const Dropdown: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
    const [currentTab, setCurrentTab] = useState<null | number>(null)
    const [direction, setDirection] = useState<'rtl' | 'ltr' | null>(null)

    const setAnimationDirection = (tab: number | null) => {
        if (typeof currentTab === 'number' && typeof tab === 'number') {
            setDirection(currentTab > tab ? 'rtl' : 'ltr')
        } else if (tab === null) {
            setDirection(null)
        }

        setCurrentTab(tab)
    }

    return (
        <DirectionContext.Provider value={{ direction, setAnimationDirection }}>
            <CurrentTabContext.Provider value={{ currentTab }}>
                <span
                    onMouseLeave={() => setAnimationDirection(null)}
                    className={cn('flex h-fit gap-2', className)}>
                    {children}
                </span>
            </CurrentTabContext.Provider>
        </DirectionContext.Provider>
    )
}

export const TriggerWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentTab } = useContext(CurrentTabContext)!
    const { setAnimationDirection } = useContext(DirectionContext)!

    return (
        <>
            {React.Children.map(children, (e, i) => (
                <button
                    onMouseEnter={() => setAnimationDirection(i + 1)}
                    onClick={() => setAnimationDirection(i + 1)}
                >
                    {e}
                </button>
            ))}
        </>
    )
}

export const Trigger: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className
}) => {
    return (
        <span className={cn('', className)}>{children}</span>

    )
}

export const Tabs: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className
}) => {
    const { currentTab } = useContext(CurrentTabContext)!
    const { direction } = useContext(DirectionContext)!
    return (
        <>
            <motion.div
                id="overlay-content"
                initial={{
                    opacity: 0,
                    scale: 0.98
                }}
                animate={
                    currentTab
                        ? {
                            opacity: 1,
                            scale: 1
                        }
                        : { opacity: 0, scale: 0.98 }
                }
                className="absolute top-[100%] w-dvw">

                <div
                    className={cn(
                        'backdrop-blur-xl',
                        className
                    )}>
                    {React.Children.map(children, (e, i) => (
                        <div className="overflow-hidden">
                            <AnimatePresence>
                                {currentTab !== null && (
                                    <motion.div exit={{ opacity: 0 }}>
                                        {currentTab === i + 1 && (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    x: direction === 'ltr' ? 100 : direction === 'rtl' ? -100 : 0
                                                }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.2 }}>
                                                {e}
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </motion.div>
        </>
    )
}

export const Tab: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className
}) => {
    return <div className={cn('', className)}>{children}</div>
}
