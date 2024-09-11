import { useColumns } from "@/hooks/use-columns";
import { useFormSchema } from "@/hooks/use-form-schema";
import { handleApiCrudRequest, handleApiRequest } from "@/services/crud-service";
import { handleImageIntegration } from "@/services/image-service";
import { TableItemEditorProps } from "@/types/item-editor";
import { isEqual } from "lodash";
import { useCallback } from "react";

export const useTableItemEditor = ({ item, tableName, method, onClose }: TableItemEditorProps) => {
    const columns = useColumns(tableName);
    const formSchema = useFormSchema(columns);

    // TODO verify if is possible to handle the image inventory via backend
    const onSubmit = useCallback(async (data: any) => {
        const changedData = getChangedFields(item, data)

        let newData: any = {
            ...changedData,
            ...(method !== 'create' ? { id: item?.id } : {}),
        }


        const { result } = await handleApiCrudRequest(newData, tableName, method);


        const files = await handleImageIntegration(item, { ...data, ...result });
        const updatedItem = files.length ? await handleApiRequest('get-by-id', { tableName, id: result.id }) : result

        onClose({ item: updatedItem, method });
    }, [item, tableName, method, onClose]);

    const handleDelete = useCallback(async () => {
        const where = item!.id ? { id: item!.id } : {};
        const res = await handleApiCrudRequest({ where }, tableName, 'delete');
        onClose({ item: res, method: 'delete' });
    }, [item, tableName, onClose]);

    return {
        columns,
        onSubmit,
        handleDelete,
        formSchema
    };
};


export function getChangedFields(defaultItem: any, newItem: any) {
    return Object.fromEntries(
        Object.entries(newItem).filter(
            ([key, value]) => !isEqual(value, (defaultItem as any)?.[key])
        )
    );
}
