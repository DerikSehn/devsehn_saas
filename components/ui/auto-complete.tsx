"use client";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { isFunction } from "lodash";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

interface AutoCompleteProps {
    options: { id: string; label: string }[];
    placeholder?: string;
    onSelect: (ids: string[]) => void;
    onInputChange: (input: string) => void;
    defaultValue?: { id: string; label: string }[];
    disableFilter?: boolean;
}

export function AutoComplete({
    options,
    placeholder = "Search...",
    onSelect,
    disableFilter,
    defaultValue,
    onInputChange,
}: AutoCompleteProps) {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const [selectedIds, setSelectedIds] = React.useState<string[]>(defaultValue?.map((item: any) => item.id) || []);
    const [filteredOptions, setFilteredOptions] = React.useState(options);

    function handleInputChange(input: string) {
        setInputValue(input);
        onInputChange(input);
    }

    function handleSelect(value: string) {
        let updatedValues;
        if (selectedIds.includes(value)) {
            updatedValues = selectedIds.filter((v) => v !== value);
        } else {
            updatedValues = [...selectedIds, value];
        }
        setSelectedIds(updatedValues);
        onSelect(updatedValues);
    }

    React.useEffect(() => {
        const handler = !disableFilter && setTimeout(() => {
            if (inputValue.trim() !== "") {
                const filtered = options.filter(option =>
                    option.label.toLowerCase().includes(inputValue.toLowerCase())
                );
                setFilteredOptions(filtered);
            } else {
                setFilteredOptions(options);
            }
        }, 300);

        return () => {
            if (isFunction(handler)) {
                clearTimeout(handler as any);
            }
        };
    }, [inputValue, options, disableFilter]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {selectedIds.length > 0
                        ? `${selectedIds.length} selected`
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder={placeholder}
                        value={inputValue}
                        onValueChange={handleInputChange}
                    />
                    <CommandEmpty>Não há opções.</CommandEmpty>
                    <CommandList>
                        <CommandGroup>
                            {(disableFilter ? options : filteredOptions).map(option => (
                                <CommandItem
                                    key={option.id}
                                    value={option.id}
                                    onSelect={() => handleSelect(option.id)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedIds.includes(option.id) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
