"use client"
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { getAsyncColumns } from '@/lib/prisma';
import { CrudRequest, handleApiRequest, handleCreateImage } from '@/pages/api/crud';
import { motion } from 'framer-motion';
import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import AutoFormFile from "../ui/auto-form/fields/file";
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
        setColumns(columns);
    }

    const onSubmit = async (data: FormData) => {
        console.log(data.id)

        console.log(data)

        const newDataEntries = await handleImageIntegration(item, data)

        const convertedItem = Object.fromEntries(newDataEntries);
        const integratedImages = await handleImageIntegration(item, data)

        console.log(integratedImages)
        const newData = {
            ...data,
            ...integratedImages
        };

        const res = await handleApiRequest(newData, tableName, method);
        console.log(res)

        onClose({ item: res, method });
    };
    const handleDelete = async () => {
        console.log(item)
        console.log(tableName)
        const where = item!.id ? { id: item!.id } : {};
        const res = await handleApiRequest({ where }, tableName, 'delete');
        onClose({ item: res, method: 'delete' });
    }



    useEffect(() => {
        getColumns();
    }, []);

    const generateZodSchema = () => {
        const schema: any = {};
        columns.filter(canShowColumn).forEach(col => {
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
                    schema[col.name] = z.array(z.any())
                    break;
                case 'Image':
                case 'Images':
                    schema[col.name] = z.any().optional()
                    break;
                default:
                    schema[col.name] = z.string().optional()
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
                formSchema={formSchema}

                values={item}
                onSubmit={onSubmit}
                fieldConfig={{
                    image: {
                        inputProps: {
                            accept: 'image/*',
                            multiple: false,
                        },
                        fieldType: AutoFormFiles,
                    },
                    images: {
                        fieldType: AutoFormFiles,
                        description: 'Escolha uma ou mais imagens',
                    },

                }}
            >
                <br className="h-full" />
                <AutoFormSubmit className='mr-2'>
                    Salvar
                </AutoFormSubmit>
                {item &&
                    <Button type="button" className="bg-red-500 hover:bg-red-700 text-white mr-2" onClick={handleDelete}>Remover Item</Button>
                }
                {/* <Button type="button" className="bg-gray-500 hover:bg-gray-700 text-white" onClick={handleReset}>Reiniciar</Button> */}
            </AutoForm>
        </motion.div >
    );
};

export default TableItemEditor;


const handleImageIntegration = async (defaultForm: FormData, form: FormData) => {
    console.log(form);

    // Filter out changed images that do not have an 'id'
    let changedImages = Object.entries(form).filter(([key, value]) => {
        console.log(key)
        console.log(value)
        return key.startsWith('image')
    }
    )
    if (defaultForm?.id) {
        changedImages = changedImages.filter(([key, value], index) => !isEqual(value, defaultForm[key]?.[index]));
    }

    console.log(changedImages);

    // Process images: create new images only if they don't have an 'id'
    const integratedImages = Object.fromEntries(await Promise.all(changedImages.map(async ([key, value]) => {
        console.log(value);
        let result;

        // Check if value is an array or a single object
        const images = Array.isArray(value) ? value : [value];
        console.log(images)


        // Filter out images without 'id' for creation
        const imagesWithoutId = images.filter((item: any) => !item.image?.id);
        console.log(imagesWithoutId)

        if (imagesWithoutId.length > 0) {
            // Handle creation for images without 'id'
            result = await handleCreateImage(imagesWithoutId);
        } else {
            // No new images to create, use empty array or existing images
            result = { files: [] };
        }

        console.log(result);
        return [key, result.files];
    })));

    console.log(integratedImages);

    // Merge new integrated images with default form
    const newObject = {
        ...defaultForm,
        ...form,
        ...integratedImages
    };
    console.log(newObject);

    return newObject;
}; 