import Logo from "@/app/hero/Logo";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface ListIconProps {
    children: any;
    href?: string;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement> | undefined) => void;
}

const ListIcon = ({
    children,
    href = '',
    className = '',
    onClick,
}: ListIconProps) => {

    return (
        <Link
            className={twMerge(
                `flex rounded-lg p-2 transition-colors`,
                href && 'hover:bg-neutral-100',
                className
            )}
            href={href}
            onClick={onClick}
        >
            {children}
        </Link>
    );
};

export default ListIcon;