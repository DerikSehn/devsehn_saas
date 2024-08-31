import { CrudRequest } from '@/types/crud';
import { Prisma, PrismaClient } from '@prisma/client'
import { formatIncludeFields } from './utils/prisma-utils';

const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma


const restrictedColumns = ['id', 'created_at']

export function isColumnRestrict(colName: string) {
    return restrictedColumns.some((value) => value === colName)
}

export function handleGetColumns(modelName: CrudRequest['table'], readOnly?: boolean) {

    const model = Prisma.dmmf.datamodel.models.find(m => m.name.toLowerCase() === String(modelName).toLowerCase())

    /* Allowed to edit Columns only */
    const fields = model?.fields.filter(f => !isColumnRestrict(f.name))
    return readOnly ? model?.fields : fields || [];
}

export async function getAsyncColumns(modelName: CrudRequest['table']) {

    const response = await fetch(`/api/protected/columns`, {
        method: "POST",
        body: JSON.stringify({
            modelName
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to get columns");
    }

    const json = await response.json();
    return json;
}

export async function getLastImageId() {
    const lastImage = await prisma.image.findFirst({
        orderBy: { id: 'desc' }
    });
    return lastImage ? lastImage.id : 0;
}

export function getIncludeFields(tableName: string) {
    const columns = Object.fromEntries(
        handleGetColumns(tableName as CrudRequest["table"])?.map((column) => [
            column.name,
            column,
        ]) as any
    );

    const include = formatIncludeFields(columns);
    return include
}