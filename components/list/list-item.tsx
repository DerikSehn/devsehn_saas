import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { ConfirmDialog } from '../ui/dialog/confirm-dialog';

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

const handleStop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
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
                <div>
                    <h3>
                        {(item as any)?.name || item?.title}
                    </h3>
                    <p>
                        {item.description}
                    </p>
                </div>
            }
            {onDelete ?
                <span onClick={handleStop}>

                    <ConfirmDialog onConfirm={handleDelete} title="Remover Item" message="Tem certeza que deseja remover este item?" >
                        <button
                            title="Remover Item" className={cn(
                                "absolute z-50 right-0  rounded-md inset-y-0 p-3 w-20 h-[75px] ",
                                "flex justify-end items-center",
                                "bg-gradient-to-l  from-neutral-200 from-40% to-neutral-100 border",
                                "transition-all duration-500 opacity-0 group-hover/item:opacity-100 hover:bg-neutral-100 hover:bg-none"
                            )} aria-label="Remove image">
                            <X className="text-red-500 duration-500 translate-x-2 group-hover/item:translate-x-0 transition-all" size={30} />
                        </button>
                    </ConfirmDialog>
                </span>
                : null
            }
        </motion.div>
    );
};

export default ListItem;

