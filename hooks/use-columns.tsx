import { useEffect, useState } from 'react';
import { CrudRequest } from '@/types/crud';
import { getAsyncColumns } from '@/lib/prisma';
import { Column } from '@/types/column';

export const useColumns = (tableName: CrudRequest['table']) => {
    const [columns, setColumns] = useState<Column[]>([]);

    useEffect(() => {
        const fetchColumns = async () => {
            const columns = await getAsyncColumns(tableName);
            setColumns(columns);
        };
        fetchColumns();
    }, [tableName]);

    return columns;
};