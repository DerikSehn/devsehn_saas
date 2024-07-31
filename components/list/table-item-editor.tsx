"use client"
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { getAsyncColumns } from '@/lib/prisma';
import { CrudRequest, handleApiRequest, handleCreateImage } from '@/pages/api/protected/crud';
import { motion } from 'framer-motion';
import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import AutoFormComplete from "../ui/auto-form/fields/auto-complete";
import AutoFormFiles from "../ui/auto-form/fields/files";
import AutoFormInput from "../ui/auto-form/fields/input";
import AutoFormTextarea from "../ui/auto-form/fields/textarea";
import { Button } from '../ui/button';
import { Item } from './list-item';

type FormData = any

export interface TableItemEditorProps {
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

        if (['updatedAt', 'createdAt'].includes(col.name)
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
        /* console.log(data.id) */

        /* console.log(data) */

        const integratedImages = await handleImageIntegration(item, data)

        /* console.log(integratedImages) */
        const newData = {
            ...data,
            ...integratedImages
        };

        const res = await handleApiRequest(newData, tableName, method);
        /* console.log(res) */

        onClose({ item: res, method });
    };
    const handleDelete = async () => {
        /* console.log(item) */
        /* console.log(tableName) */
        const where = item!.id ? { id: item!.id } : {};
        const res = await handleApiRequest({ where }, tableName, 'delete');
        onClose({ item: res, method: 'delete' });
    }



    useEffect(() => {
        getColumns();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const generateZodSchema = () => {
        const schema: any = {};
        /* console.log(columns) */
        columns.filter(canShowColumn).forEach(col => {
            /* console.log({ [col.name]: col.type }) */
            switch (col.type) {
                case 'text':
                case 'character varying':
                    schema[col.name] = z.string();
                    break;
                case 'timestamp with time zone':
                    schema[col.name] = z.coerce.date()
                    break;
                case 'bigint':
                case 'Int':
                case 'Float':
                    schema[col.name] = z.coerce.number()
                    break;
                case 'ARRAY':
                    schema[col.name] = z.array(z.any())
                    break;
                case 'Image':
                case 'Images':
                    schema[col.name] = z.any().optional()
                    break;
                case 'String':
                    schema[col.name] = z.string()
                    break;
                default:
                    schema[col.name] = z.any().optional()
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="md:p-4 pb-20 border-l shadow-inner max-h-[calc(100dvh-140px)] h-[calc(100dvh-140px)] overflow-y-auto border-neutral-200 w-full  ">
            <AutoForm
                formSchema={formSchema}
                className="static "

                values={item}
                onSubmit={onSubmit}
                fieldConfig={getFieldConfig(columns.filter(canShowColumn))}
            >
                <div className="absolute bottom-0 right-0 left-0 w-full bg-neutral-100 border-t p-4 flex flex-row justify-start shadow-[-20px_0px_10px_rgba(0,0,0,0.2)]">

                    <AutoFormSubmit className='mr-2 w-40'>
                        Salvar
                    </AutoFormSubmit>
                    {item &&
                        <Button type="button" className="bg-red-500 hover:bg-red-700 text-white mr-2" onClick={handleDelete}>Remover Item</Button>
                    }
                    {/* <Button type="button" className="bg-gray-500 hover:bg-gray-700 text-white" onClick={handleReset}>Reiniciar</Button> */}
                </div>
            </AutoForm>
        </motion.div >
    );
};

export default TableItemEditor;


const handleImageIntegration = async (defaultForm: FormData, form: FormData) => {
    /* console.log(form); */

    // Filter out changed images that do not have an 'id'
    let changedImages = Object.entries(form).filter(([key, value]) => {
        /* console.log(key) */
        /* console.log(value) */
        return key.startsWith('image')
    }
    )
    if (defaultForm?.id) {
        changedImages = changedImages.filter(([key, value], index) => !isEqual(value, defaultForm[key]?.[index]));
    }

    /* console.log(changedImages); */

    // Process images: create new images only if they don't have an 'id'
    const integratedImages = Object.fromEntries(await Promise.all(changedImages.map(async ([key, value]) => {
        /* console.log(value); */
        let result;

        // Check if value is an array or a single object
        const images = Array.isArray(value) ? value : [value];
        /* console.log(images) */


        // Filter out images without 'id' for creation
        const imagesWithoutId = images.filter((item: any) => !item.image?.id);
        /* console.log(imagesWithoutId) */

        if (imagesWithoutId.length > 0) {
            // Handle creation for images without 'id'
            result = await handleCreateImage(imagesWithoutId);
        } else {
            // No new images to create, use empty array or existing images
            result = { files: [] };
        }

        /* console.log(result); */
        return [key, (result as any).files];
    })));

    /* console.log(integratedImages); */

    // Merge new integrated images with default form
    const newObject = {
        ...defaultForm,
        ...form,
        ...integratedImages
    };
    /* console.log(newObject); */

    return newObject;
};

const getFieldConfig = (columns: any[]) => {

    /* console.log(columns) */
    let config: any = {}

    columns.forEach(col => {

        switch (col.name) {
            case 'image':
            case 'images':
                config[col.name] = {
                    inputProps: {
                        accept: 'image/*',
                        multiple: col.isList,
                    },
                    fieldType: AutoFormFiles,
                }
                return;
            case 'name':
                config[col.name] = {
                    inputProps: {
                        type: 'text',
                    },
                    fieldType: AutoFormInput,
                    label: 'Nome',
                }
                return;
            case 'description':
                config[col.name] = {
                    inputProps: {
                        type: 'text',
                    },
                    fieldType: AutoFormTextarea,
                    label: 'Descrição',
                    description: 'Insira a descrição',
                }
                return;
            case 'password':
                config[col.name] = {
                    inputProps: {
                        type: 'password',
                    },
                    label: 'Senha',
                    description: 'Insira a senha',
                }
                return;
            default:
                break;
        }

        switch (col.type) {
            case 'Int':
            case 'Float':
            case 'bigint':
                config[col.name] = {
                    inputProps: {
                        type: 'number',
                    },
                    fieldType: AutoFormInput,
                }
                break;
        }

        if (col.isList) {

            const relatedTable = col.relationToFields.length > 0 ? col.relationToFields[0] : col.type;

            /* console.log(relatedTable) */
            config[col.name] = {
                fieldType: AutoFormComplete,
                inputProps: {
                    multiple: col.isList,
                    type: relatedTable,
                },
            }
        }


    })

    return config

}
