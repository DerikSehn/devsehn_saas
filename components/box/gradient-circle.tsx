import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const gradients = [
    "from-violet-700 to-violet-500",
    "from-emerald-700 to-emerald-500",
    "from-sky-700 to-sky-500",
    "from-delft_blue-700 to-delft_blue-500",
    "from-primary-500 to-primary-700",
    "from-fuchsia-700 to-fuchsia-500",
    "from-purple-700 to-purple-500",
    "from-indigo-700 to-indigo-500",
];

export default function GradientCircle({ children, className, index = 0 }: { index?: number, children: React.ReactNode, className?: string }) {
    const gradient = gradients[index % gradients.length];

    return (
        <span
            className={twMerge(
                "flex items-center justify-center",
                "rounded-full aspect-square p-1 text-neutral-600 bg-gradient-to-br ",
                gradient,
                className
            )}
        >
            {children}
        </span>
    );
}
