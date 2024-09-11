"use client";

import React from "react";

import { cn } from "@/lib/utils";

interface PulsatingButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    pulseColor?: string;
    duration?: string;
}

export default function PulsatingButton({
    className,
    children,
    pulseColor = "#4b5835",
    duration = "1.5s",
    ...props
}: PulsatingButtonProps) {
    return (
        <button
            className={cn(
                "relative text-center cursor-pointer flex justify-center items-center rounded-full text-white dark:text-black bg-primary-500 dark:bg-primary-500  ",
                className,
            )}
            style={
                {
                    "--pulse-color": pulseColor,
                    "--duration": duration,
                } as React.CSSProperties
            }
            {...props}
        >
            <div className="absolute top-1/2 left-1/2 size-full rounded-full bg-inherit animate-pulse -translate-x-1/2 -translate-y-1/2 z-0" />
            <div className=" z-10">{children}</div>
        </button>
    );
}
