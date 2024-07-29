import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useEffect, useState } from "react";
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
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState<[string, string][]>([]);
    const [loading, setLoading] = useState(false);
    const tableName = fieldProps.type;
    console.log(fieldProps)
    useEffect(() => {
        const handler = setTimeout(() => {
            if (inputValue.trim() !== "") {
                setLoading(true);
                fetch(`/api/protected/auto-complete/${tableName}?query=${inputValue}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setOptions(data.slice(0, 12).map((item: { id: string; label: string }) => [item.id, item.label]));
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error fetching auto-complete options:", error);
                        setLoading(false);
                    });
            } else {
                setOptions([]);
            }
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, tableName]);

    function findItem(value: any) {
        return options.find((item) => item[0] === value);
    }

    return (
        <FormItem>
            <AutoFormLabel label={fieldConfigItem?.label || label} isRequired={isRequired} />
            <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value} {...fieldProps}>
                    <SelectTrigger className={fieldProps.className}>
                        <SelectValue placeholder={fieldConfigItem.inputProps?.placeholder}>
                            {field.value ? findItem(field.value)?.[1] : "Select an option"}
                        </SelectValue>
                    </SelectTrigger>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="mt-2 p-2 border rounded"
                        placeholder="Type to search..."
                    />
                    {loading && <p>Loading...</p>}
                    <SelectContent>
                        {options.map(([value, label]) => (
                            <SelectItem value={value} key={value}>
                                {label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </FormControl>
            <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
            <FormMessage />
        </FormItem>
    );
}
