import { tourSteps } from "@/data/tour-data";
import { canShowColumn } from "@/hooks/use-form-schema";
import { useTableItemEditor } from "@/hooks/use-table-item-editor";
import { useTour } from "@/hooks/use-tour";
import { getFieldConfig } from "@/services/item-editor-service";
import { TableItemEditorProps } from "@/types/item-editor";
import { motion } from "framer-motion";
import AutoForm, { AutoFormSubmit } from "../ui/auto-form";
import { Button } from "../ui/button";

const TableItemEditor = ({ item, onClose = () => { }, tableName, method }: TableItemEditorProps) => {

    const { columns, onSubmit, handleDelete, formSchema } = useTableItemEditor({ item, tableName, method, onClose });

    useTour({ steps: tourSteps });

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            id="step-item-editor"
            className="md:p-4 pb-20 border-l shadow-inner max-h-[calc(100dvh-140px)] h-[calc(100dvh-140px)] overflow-y-auto border-neutral-200 w-full">
            <AutoForm
                formSchema={formSchema}
                className="static"
                id="step-item-editor-form"
                values={item}
                onSubmit={onSubmit}
                fieldConfig={getFieldConfig(columns.filter(canShowColumn))}
            >
                <div className="absolute bottom-0 right-0 left-0 w-full bg-neutral-100 border-t p-4 flex flex-row justify-start shadow-[-20px_0px_10px_rgba(0,0,0,0.2)]">
                    <AutoFormSubmit id="step-submit" className='mr-2 w-40'>
                        Salvar
                    </AutoFormSubmit>
                    {item &&
                        <Button
                            id="step-delete"
                            type="button"
                            className="bg-red-500 hover:bg-red-700 text-white mr-2"
                            onClick={handleDelete}>Remover Item</Button>
                    }
                </div>
            </AutoForm>
        </motion.div>
    );
};

export default TableItemEditor;
