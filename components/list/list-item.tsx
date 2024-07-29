import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { ConfirmDialog } from '../ui/dialog/confirm-dialog';
import TableItemWrapper from './list-item-wrapper';

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
    onDelete?(): any;
}

const ListItem: React.FC<ListItemProps> = ({ item, onClick, onDelete, children }) => {

    const handleDelete = async () => {
        if (typeof onDelete === 'function') {
            onDelete()
        }
    }

    return (
        <motion.div
            role={'button'}
            onClick={() => onClick && onClick(item)}
            className={cn('group/item relative z-[0]')} >
            {children ||
                <p>{item.description}</p>
            }
            {onDelete ?
                <span onClick={handleStop}>

                    <ConfirmDialog onConfirm={handleDelete} title="Remover Item" message="Tem certeza que deseja remover este item?" >
                        <button
                            title="Remover Item" className={cn(
                                "absolute z-50 right-0  rounded-md inset-y-0 p-3 w-20 ",
                                "flex justify-end items-center",
                                "bg-gradient-to-l  from-neutral-200 from-40% to-neutral-100 border-l",
                                "transition-all duration-500 opacity-0 group-hover/item:opacity-100"
                            )} aria-label="Remove image">
                            <X className="text-red-500 duration-500 translate-x-0 group-hover/item:-translate-x-2 transition-all" size={30} />
                        </button>
                    </ConfirmDialog>
                </span>
                : null
            }
        </motion.div>
    );
};

export default ListItem;


const handleStop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
}   