import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { useEffect, useState } from "react";
import { AutoComplete } from "../../auto-complete";
import AutoFormLabel from "../common/label";
import AutoFormTooltip from "../common/tooltip";
import { AutoFormInputComponentProps } from "../types";

export default function AutoFormComplete({
    label,
    isRequired,
    field,
    fieldConfigItem,
    fieldProps,
}: AutoFormInputComponentProps) {
    const [options, setOptions] = useState<{ id: string; label: string }[]>([]);
    const tableName = fieldProps.type;

    const handleSelect = (ids: string[]) => {
        field.onChange(ids.map((id: string) => ({ id })));
    }

    const handleFetchOptions = async (id?: string) => {
        fetch(`/api/protected/auto-complete/${tableName}?query=${id || ""}`)
            .then((response) => response.json())
            .then((data) => {
                setOptions(data.map((item: any) => ({ id: item.id, label: item?.title || item?.name })));
            })
            .catch((error) => {
                console.error("Error fetching auto-complete options:", error);
            });
    }
    useEffect(() => {
        handleFetchOptions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableName]);

    return (
        <FormItem className="flex flex-col">
            <AutoFormLabel label={fieldConfigItem?.label || label} isRequired={isRequired} />
            <FormControl>
                <AutoComplete
                    options={options}
                    onInputChange={handleFetchOptions}
                    placeholder="Digite para pesquisar..."
                    disableFilter={true}
                    defaultValue={field?.value?.map((item: any) => ({ id: item.id, label: item?.title || item?.name }))}
                    onSelect={handleSelect}
                />
            </FormControl>
            <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
            <FormMessage />
        </FormItem>
    );
}
