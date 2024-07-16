"use client"
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { getAsyncColumns } from '@/lib/prisma';
import { CrudRequest, handleApiRequest, handleCreateImage } from '@/pages/api/crud';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import AutoFormFile from '../ui/auto-form/fields/file';
import AutoFormFiles from "../ui/auto-form/fields/files";
import { Button } from '../ui/button';
import { Item } from './list-item';

type FormData = any

interface TableItemEditorProps {
    item?: Item;
    onClose?({ item, method }: {
        item?: Item,
        method?: CrudRequest["method"]
    }): any;
    method: CrudRequest["method"]
    tableName: CrudRequest["table"]
}

interface Column {
    name: string;
    kind: string;
    isList: boolean;
    isRequired: boolean;
    isUnique: boolean;
    isId: boolean;
    isReadOnly: boolean;
    hasDefaultValue: boolean;
    type: string;
    isGenerated: boolean;
    isUpdatedAt: boolean;
    description: string;
}

const TableItemEditor = ({ item, onClose = () => { }, tableName, method }: TableItemEditorProps) => {
    const [columns, setColumns] = useState<Column[]>([]);


    const canShowColumn = (col: Column) => {
        if (col.name === 'images') {
            console.log(col)
            console.log(col.isList)
        }
        if (['updatedAt', 'createdAt'].includes(col.name)
            || col.isUnique
            || col.isId
            || col.isReadOnly
        ) {
            return false;
        }
        return true;
    }

    const getColumns = async () => {
        const columns = await getAsyncColumns(tableName);
        console.log(columns)
        setColumns(columns);
    }

    const onSubmit = async (data: FormData) => {
        console.log(data);

        const newDataEntries = await Promise.all(
            Object.entries({ ...item, ...data }).map(async ([key, value]) => {
                /* @ts-ignore */
                if (key.startsWith('image') && item?.image !== value) {
                    const createdImage = await handleCreateImage({
                        file: value as File | File[],
                        description: `Image of ${tableName as string}`
                    });
                    return ['imageId', createdImage.id]; // Transfer id to imageId
                }
                return [key, value];
            })
        );

        const convertedItem = Object.fromEntries(newDataEntries);

        const newData = {
            ...convertedItem,
            image: undefined
        };
        console.log(convertedItem)

        console.log(newData);
        const res = await handleApiRequest(newData, tableName, method);
        console.log(res);
        /* @ts-ignore */
        onClose({ item: { ...convertedItem, image: item?.image, ...(method === 'create' ? { id: res.id } : {}) }, method });
    };
    const handleDelete = async () => {
        const res = await handleApiRequest(item, tableName, 'delete');
        onClose({ item: res, method: 'delete' });
    }

    useEffect(() => {
        getColumns();
    }, []);

    const generateZodSchema = () => {
        const schema: any = {};
        columns.filter(canShowColumn).forEach(col => {
            console.log(col.name)
            switch (col.type) {
                case 'text':
                case 'character varying':
                    schema[col.name] = z.string();
                    break;
                case 'timestamp with time zone':
                    schema[col.name] = z.coerce.date()
                    break;
                case 'bigint':
                    schema[col.name] = z.coerce.number()
                    break;
                case 'ARRAY':
                    schema[col.name] = z.array(z.string())
                    break;
                case 'Image':
                    schema[col.name] = z.any()
                    break;
                default:
                    schema[col.name] = z.string()
                    break;
            }
            if (!col.isRequired) {
                schema[col.name] = schema[col.name].optional()
            }
            schema[col.name] = schema[col.name].describe(col.description);
        });
        return z.object(schema);
    }

    const formSchema = generateZodSchema();

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 mt-4 border-l  border-neutral-200 w-full">
            <AutoForm
                formSchema={formSchema} values={item}
                onSubmit={onSubmit}
                fieldConfig={{
                    image: {
                        fieldType: AutoFormFile,
                    },
                    images: {
                        fieldType: AutoFormFiles,
                        description: 'Escolha uma ou mais imagens',
                    },

                }}
            >
                <br className="h-full" />
                <AutoFormSubmit className='mr-2'>Salvar</AutoFormSubmit>
                {item &&
                    <Button type="button" className="bg-red-500 hover:bg-red-700 text-white mr-2" onClick={handleDelete}>Remover Item</Button>
                }
                <Button type="button" className="bg-gray-500 hover:bg-gray-700 text-white" /* onClick={() => reset(item)} */>Reiniciar</Button>
            </AutoForm>
        </motion.div>
    );
};

export default TableItemEditor;
