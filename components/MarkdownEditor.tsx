// components/MarkdownEditor.tsx
import React from 'react';
import dynamic from 'next/dynamic';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import AutoFormLabel from "@/components/ui/auto-form/common/label";
import AutoFormTooltip from "@/components/ui/auto-form/common/tooltip";
import { AutoFormInputComponentProps } from "@/components/ui/auto-form/types";

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });
const mdParser = new MarkdownIt();

const MarkdownEditor: React.FC<AutoFormInputComponentProps> = ({
    label,
    isRequired,
    fieldConfigItem,
    fieldProps,
    field,
}) => {
    const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
    const showLabel = _showLabel === undefined ? true : _showLabel;

    return (
        <FormItem>
            {showLabel && (
                <AutoFormLabel
                    label={fieldConfigItem?.label || label}
                    isRequired={isRequired}
                />
            )}
            <FormControl>
                <MdEditor
                    value={field.value}
                    className='w-full h-full min-h-[500px]'
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={({ text }) => field.onChange(text)}
                    {...fieldPropsWithoutShowLabel}
                />
            </FormControl>
            <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
            <FormMessage />
        </FormItem>
    );
};

export default MarkdownEditor;