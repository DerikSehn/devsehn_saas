import { cn } from '@/lib/utils';
import { CrudRequest, handleApiRequest } from '@/pages/api/protected/crud';
import { PlusIcon } from 'lucide-react';
import { cloneElement, ReactElement, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useToast } from '../providers/toast-provider';

import SparklesText from '../magicui/sparkles-text';
import { Button } from '../ui/button';
import ListItem, { Item } from './list-item';
import ListItemWrapper from './list-item-wrapper';
import ListPagination from './list-pagination';
import TableItemEditor, { TableItemEditorProps } from './table-item-editor';

interface Option {
    value: string;
    label: string;
}

interface ListProps<T> {
    items: T[];
    onClick?(item: Item): any;
    onSubmit?(item: Item, reason: CrudRequest["method"]): any;
    enableEditor?: boolean;
    itemsPerPage?: number;
    sortOptions?: Option[];
    filterOptions?: Option[];
    className?: string;
    customEditor?: ReactElement<TableItemEditorProps>;
    tableName?: CrudRequest["table"];
    header?: {
        title: string;
        subTitle?: string;
        className?: string
    }
    children?: ReactElement<T>;
}

const List = <T extends Item | undefined,>({
    items = [],
    itemsPerPage = 10,
    sortOptions = [],
    filterOptions = [],
    onClick,
    onSubmit,
    customEditor,
    enableEditor,
    className,
    tableName,
    header,
    children
}: ListProps<T>) => {
    const notify = useToast();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState(sortOptions[0]?.value || '');
    const [filterOption, setFilterOption] = useState(filterOptions[0]?.value || '');
    const [isSelected, setIsSelected] = useState(false)
    const [currentList, setList] = useState(items)

    const handleSubmit = ({ item: itemData, method: reason }: { item: any, method: CrudRequest["method"] }) => {
        setIsSelected(!isSelected)
        switch (reason) {
            case 'create':
                setList(pvSt => [...pvSt, itemData])
                break;
            case 'update':
                setList(pvSt => pvSt.map(item => item!.id === itemData.id ? itemData : item))
                break;
            case 'delete':
                setList(pvSt => pvSt.filter(item => item!.id !== itemData.id))
                break;
        }
        if (typeof onSubmit === 'function') {
            onSubmit(itemData, reason)
        }
    }

    const handleItemClick = (item: Item) => {
        setIsSelected(!isSelected)
        if (typeof onClick === 'function') {
            onClick(item)
        }
    }
    const handleItemDelete = async (id: number) => {
        const where = { id }
        const res = await handleApiRequest({ where }, tableName!, 'delete');
        if (res.error) {
            notify(res.error, { type: 'error' })
        }
        setList(pvSt => pvSt.filter(item => item!.id !== id))
    }



    useEffect(() => {
        if (sortOptions.length === 0) {
            setSortOption('');
        }
        if (filterOptions.length === 0) {
            setFilterOption('');
        }
    }, [sortOptions, filterOptions]);

    const sortedItems = sortOptions.length
        ? [...currentList].sort((a, b) => {
            /* @ts-ignore */
            return a?.[sortOption as keyof Item] > b?.[sortOption as keyof Item] ? 1 : -1;
        })
        : currentList;

    const filteredItems = filterOptions.length > 1 && filterOption
        /* @ts-ignore */
        ? sortedItems.filter((item) => item.category === filterOption)
        : sortedItems;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

    const showPagination = itemsPerPage < currentList.length;

    return (
        <div className={twMerge("relative space-y-2", className)}>
            {header && <div className={cn("flex col-span-full", header.className)}>

                <SparklesText text={header.title} className={cn("text-neutral-700 text-2xl font-bold ")}
                    duration={5}
                    sparklesCount={2}
                    colors={{ first: "#70b266", second: "#cfe5cc" }} />
                {enableEditor ?
                    <ListItemWrapper onSubmit={handleSubmit}
                        clickArea={
                            <Button variant={'outline'} className="absolute  right-2 top-2 rounded-3xl flex justify-between space-x-2">
                                <PlusIcon className=" w-6 h-6 text-neutral-800" />
                            </Button>
                        }
                    >
                        <TableItemEditor method={'create'} onClose={() => { }} tableName={tableName!} />
                    </ListItemWrapper>
                    : null
                }
            </div>
            }

            {(sortOptions.length > 0 || filterOptions.length > 0) && (
                <div className="flex justify-between">
                    {sortOptions.length > 0 && (
                        <select
                            className="border rounded-lg border-neutral-100/30 p-2 bg-transparent"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}
                    {filterOptions.length > 0 && (
                        <select
                            className="border rounded-lg border-neutral-100/30 p-2 bg-transparent"
                            value={filterOption}
                            onChange={(e) => setFilterOption(e.target.value)}
                        >
                            {filterOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            )}
            {enableEditor ? <>
                {paginatedItems.map((item) =>
                    <ListItemWrapper key={item?.id} onSubmit={handleSubmit} disableClickArea={isSelected} clickArea={
                        <ListItem onDelete={() => handleItemDelete(item!.id)} onClick={handleItemClick} item={item!} >
                            {children ? cloneElement(children, { item } as any) : null}
                        </ListItem>}
                    >
                        {customEditor ?
                            cloneElement(customEditor, { method: 'update', onClose: handleSubmit, tableName: tableName!, item: item })
                            : <TableItemEditor method="update" onClose={handleSubmit} tableName={tableName!} item={item} />
                        }
                    </ListItemWrapper>
                )}</> : paginatedItems.map((item) =>
                    <ListItem key={item!.id} onClick={handleItemClick} item={item!} />)
            }


            {showPagination && (
                <ListPagination
                    currentPage={currentPage}
                    totalItems={filteredItems.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    );
};

export default List;
