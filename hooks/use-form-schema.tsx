import { Column } from '@/types/column';
import { z } from 'zod';

export const canShowColumn = (col: Column) => {
    return !['updatedAt', 'createdAt'].includes(col.name) && !col.isId && !col.isReadOnly;
};

export const useFormSchema = (columns: Column[]) => {


    const generateZodSchema = () => {
        const schema: any = {};
        columns.filter(canShowColumn).forEach(col => {
            switch (col.type) {
                case 'text':
                case 'character varying':
                    schema[col.name] = z.string();
                    break;
                case 'timestamp with time zone':
                    schema[col.name] = z.coerce.date();
                    break;
                case 'bigint':
                case 'Int':
                case 'Float':
                    schema[col.name] = z.coerce.number();
                    break;
                case 'ARRAY':
                    schema[col.name] = z.array(z.any());
                    break;
                case 'Image':
                case 'Images':
                    schema[col.name] = z.any().optional();
                    break;
                case 'String':
                    schema[col.name] = z.string();
                    break;
                default:
                    schema[col.name] = z.any().optional();
                    break;
            }
            if (!col.isRequired) {
                schema[col.name] = schema[col.name].optional();
            }
            schema[col.name] = schema[col.name].describe(col.description);
        });
        return z.object(schema);
    };

    return generateZodSchema();
};