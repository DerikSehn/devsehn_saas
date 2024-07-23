import TableItemWrapper, { OnSubmitProps } from "@/components/list/list-item-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Image as ImageType } from "@prisma/client";
import { isArray, isObject } from "lodash";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ImageEditor from "../../image/image-editor";
import AutoFormLabel from "../common/label";
import AutoFormTooltip from "../common/tooltip";
import { AutoFormInputComponentProps } from "../types";

interface FileWithDescription {
    file: File;
    image: ImageType;
}

export default function AutoFormFiles({
    label,
    isRequired,
    fieldConfigItem,
    fieldProps = { multiple: true },
    field,
}: AutoFormInputComponentProps) {
    const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
    console.log(fieldProps);
    const showLabel = _showLabel === undefined ? true : _showLabel;
    const [files, setFiles] = useState<FileWithDescription[] | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleRemoveClick = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        field.onChange(newFiles.map((f) => f.file));
    };

    const convertImagesToItem = async () => {
        let res;
        if (isArray(field.value)) {
            res = await Promise.all(field.value.map(async (image) => {
                const file = await createFileFromUrl(image.url, image.name);
                return { file, image };
            }));
            setFiles(res);
        } else if (isObject(field.value)) {
            res = await createFileFromUrl(field.value.url, field.value.name);
            setFiles([{ file: res, image: field.value }]);
        }
    };

    useEffect(() => {
        convertImagesToItem();
    }, []);

    const handleAddFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (fileProps.multiple) {
            setFiles((prev) => {
                const updatedFiles = [...(prev || []), { file, image: { name: file.name, url: URL.createObjectURL(file) } }];
                field.onChange(updatedFiles.map(f => f.file));
                return updatedFiles;
            });
        } else {
            setFiles([{ file, image: { name: file.name, url: URL.createObjectURL(file) } }]);
            field.onChange({ file, image: { name: file.name, url: URL.createObjectURL(file) } });
        }
    };

    const handleImageClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSingleChange = (index: number) => (props: OnSubmitProps) => {
        const { item: { file, image }, method } = props;
        let newFiles = [...files];
        switch (method) {
            case 'create':
                newFiles = [...files, { file, image }];
                break;
            case 'update':
                newFiles[index] = { file, image };
                break;
            case 'delete':
                newFiles = files.filter((_, i) => i !== index);
                break;
        }
        setFiles(newFiles);
        field.onChange(newFiles.map(f => f.file));
    };

    const FcFirstImage = ({ onClick, src, className }: { onClick: any, src?: string, className?: string }) => (
        <Image
            alt="Product image"
            className={cn("aspect-square w-full rounded-md object-cover transition-all hover:opacity-75 cursor-pointer hover:brightness-90",
                src ? "hover:brightness-90" : "border-dashed border-4 border-gray-300",
                className)}
            height="300"
            src={src || "/placeholder.svg"}
            width="300"
            onClick={onClick}
        />
    );

    return (
        <Card className="overflow-hidden">
            <FormItem>
                <CardHeader>
                    <CardTitle>
                        {showLabel && (
                            <AutoFormLabel
                                label={fieldConfigItem?.label || label}
                                isRequired={isRequired}
                            />
                        )}
                    </CardTitle>
                    <CardDescription>
                        {fieldConfigItem?.description}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-2">
                        <div className="relative aspect-square">
                            {files?.length ?
                                <TableItemWrapper
                                    variant="modal"
                                    onSubmit={handleSingleChange(0)}
                                    clickArea={<FcFirstImage src={URL.createObjectURL(files[0]?.file) || files[0]?.image?.url} onClick={handleImageClick} />}
                                >
                                    <ImageEditor isRequired={isRequired} label={fieldConfigItem?.label || label} file={files[0]?.file} image={files[0]?.image} onClose={handleSingleChange(0)} />
                                </TableItemWrapper>
                                : <FcFirstImage src={!fieldProps.multiple && (files?.[0]?.file ? URL.createObjectURL(files?.[0]?.file) : files?.[0]?.image?.url)} onClick={handleImageClick} />
                            }
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {files?.length > 1 && files.slice(1).map(({ file, image }, index) => (
                                <TableItemWrapper
                                    key={index}
                                    variant="modal"
                                    onSubmit={handleSingleChange(index + 1)}
                                    clickArea={<FcFirstImage src={URL.createObjectURL(file) || image?.url} onClick={handleImageClick} />}
                                >
                                    <ImageEditor isRequired={isRequired} label={fieldConfigItem?.label || label} file={file} image={image} onClose={handleSingleChange(index + 1)} />
                                </TableItemWrapper>
                            ))}
                            <FcFirstImage onClick={handleImageClick} />
                        </div>
                    </div>
                    <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
                    <FormMessage />
                </CardContent>
            </FormItem>
        </Card>
    );
}

async function createFileFromUrl(url: string, filename: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
}
