import { CrudRequest } from '@/pages/api/protected/crud';
import { Prisma, PrismaClient } from '@prisma/client'

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

export function handleGetColumns(modelName: CrudRequest['table']) {



    const model = Prisma.dmmf.datamodel.models.find(m => m.name.toLowerCase() === String(modelName).toLowerCase())

    /* unrestrictedColumns only */
    const fields = model?.fields.filter(f => !isColumnRestrict(f.name))
    return fields || [];
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
