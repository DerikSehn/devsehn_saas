import { cn } from '@/lib/utils';
import { PlusIcon } from 'lucide-react';
import { cloneElement, ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';
import SparklesText from '../magicui/sparkles-text';
import { Button } from '../ui/button';
import ListItem, { Item } from './list-item';
import ListItemWrapper from './list-item-wrapper';
import ListPagination from './list-pagination';
import { TableItemEditorProps } from '@/types/item-editor';
import TableItemEditor from './table-item-editor';
import { CrudRequest } from '@/types/crud';
import { useCurrentList } from '@/hooks/use-current-list';

interface Option {
    value: string;
    label: string;
}

interface ListProps {
    items: any[];
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
    children?: ReactElement<Item>;
}

const List = ({
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
}: ListProps) => {
    const {
        currentPage,
        setCurrentPage,
        paginatedItems,
        showPagination,
        sortOption,
        setSortOption,
        filterOption,
        setFilterOption,
        filteredItems,
        handleSubmit,
        handleItemClick,
        handleItemDelete
    } = useCurrentList({
        items,
        itemsPerPage,
        sortOptions,
        filterOptions,
        tableName,
        onSubmit,
        onClick
    });

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
                        {customEditor ?
                            cloneElement(customEditor, { method: 'create', onClose: () => { }, tableName: tableName! })
                            : <TableItemEditor method={'create'} onClose={() => { }} tableName={tableName!} />
                        }

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
                    <ListItemWrapper key={item?.id} onSubmit={handleSubmit} clickArea={
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