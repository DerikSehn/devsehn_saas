import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export interface Item {
    id: number;
    title: string;
    description: any;
    category: string;
}

interface ListItemProps {
    item: Item;
    onClick?(item: Item): any;
    children?: any;
}

const ListItem: React.FC<ListItemProps> = ({ item, onClick, children }) => {
    return (
        <motion.div
            role={'button'}
            onClick={() => onClick && onClick(item)}
            className={twMerge(' h-full')}        >
            {children ||
                <p>{item.description}</p>
            }
        </motion.div>
    );
};

export default ListItem;
