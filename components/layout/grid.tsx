import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import ClickAwayListener from "../drawer/click-away-listener";

type Card = {
    id: number;
    content: JSX.Element | React.ReactNode | string;
    className: string;
    thumbnail: string | JSX.Element;
};

export const LayoutGrid = ({ cards, className }: { cards: Card[], className?: string }) => {
    const [selected, setSelected] = useState<Card | null>(null);
    const [lastSelected, setLastSelected] = useState<Card | null>(null);

    const handleClick = (card: Card) => {
        setLastSelected(selected);
        setSelected(card);
    };

    const handleOutsideClick = () => {
        setLastSelected(selected);
        setSelected(null);
    };

    /* 
        const skeletonObj = {
            className: 'col-span-3 skeleton',
            content: <Skeleton />,
            thumbnail: <Skeleton />
        } as Card */


    const isEnabled = (card: Card) => ((lastSelected?.id !== card.id && !card.className?.includes('skeleton')) || selected === null)


    return (
        <div className={twMerge("w-full h-full overflow-auto grid grid-cols-1 md:grid-cols-3  gap-4 content-start", className)}>
            {cards.map((card, i) => (
                <div key={i} className={cn(card.className)}>
                    <motion.div
                        onClick={() => isEnabled(card) && handleClick(card)}
                        className={cn(
                            card.className,
                            " min-h-20",
                            selected?.id === card.id
                                ? "rounded-lg cursor-pointer w-full m-auto z-50 flex flex-wrap flex-col"
                                : lastSelected?.id === card.id
                                    ? "z-40  rounded-xl h-full w-full"
                                    : " rounded-xl h-full w-full"
                        )}
                        layout
                    >
                        <BlurImage card={card} />
                        {selected?.id === card.id && <SelectedCard onClickAway={handleOutsideClick} selected={selected} />}

                    </motion.div>

                </div>
            ))}
            <motion.div
                className={cn(
                    "absolute h-full w-full left-0 top-0 z-10",
                    selected?.id ? "pointer-events-auto" : "pointer-events-none"
                )}
                animate={{ opacity: selected?.id ? 0.3 : 0 }}
            />
        </div>
    );
};

const BlurImage = ({ card }: { card: Card }) => {
    const [loaded, setLoaded] = useState(typeof card.thumbnail !== 'string');
    return typeof card.thumbnail === 'string' ? (
        <Image
            src={card.thumbnail}
            height="500"
            width="500"
            onLoad={() => setLoaded(true)}
            className={cn(
                "object-cover object-center absolute inset-0 h-full w-full transition duration-200",
                loaded ? "blur-none" : "blur-md"
            )}
            alt="thumbnail"
        />
    ) :
        <motion.div className="overflow-visible">
            {card.thumbnail}
        </motion.div>
};

const SelectedCard = ({ selected, onClickAway }: { selected: Card | null, onClickAway: any }) => {
    return (
        <ClickAwayListener enabled onClickAway={onClickAway}>
            <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg relative z-[60]">
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 100,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                    }}
                    className="relative  pb-4 z-[70]"
                >
                    {React.cloneElement(selected?.content as any, { onClose: onClickAway })}
                </motion.div>
            </div>
        </ClickAwayListener>

    );
};
