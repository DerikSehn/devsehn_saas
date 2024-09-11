import { z } from 'zod';
export const getDynamicSchema = (columns: any) => {
    return columns.reduce((acc: any, col: any) => {
        acc[col.name] = getZodSchema(col.type);
        return acc;
    }, {})
}
const getZodSchema = (dataType: string) => {
    switch (dataType) {
        case 'text':
        case 'character varying':
            return z.string()
        case 'timestamp with time zone':
            return z.string().datetime();
        case 'bigint':
            return z.number().int();
        case 'ARRAY':
            return z.array(z.string());
        default:
            return z.any();
    }
};