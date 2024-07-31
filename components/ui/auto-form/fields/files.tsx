import TableItemWrapper, { OnSubmitProps } from "@/components/list/list-item-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
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
    const showLabel = _showLabel === undefined ? true : _showLabel;
    const [files, setFiles] = useState<FileWithDescription[] | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);


    const convertImagesToItem = async () => {

        let res = undefined;
        if (isArray(field.value)) {
            res = await Promise.all(field.value.map(async (image) => {
                const file = await createFileFromUrl(image.url, image.name);
                return { file, image };
            }
            ));
            setFiles(res);
        } else if (isObject(field.value)) {
            /* @ts-ignore */
            res = await createFileFromUrl(field.value.url, field.value.name);
            /* @ts-ignore */
            setFiles({ file: res, image: field.value });
        }

    }

    useEffect(() => {
        convertImagesToItem();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleAddFile = (e: ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];

        if (fieldProps.multiple) {
            setFiles(pvSt => {
                const obj = [...(pvSt || []), { file } as any]
                field.onChange(obj);
                return obj
            });

        } else {
            setFiles({ file } as any);
            field.onChange({
                file, image: {
                    name: file!.name,
                    description: "",
                    url: URL.createObjectURL(file!)
                }
            });

        }


    };

    const handleImageClick = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSingleChange = (index: number) => (
        props: OnSubmitProps
    ) => {
        const { item: { file, image }, method } = props;

        let newFiles = [...(files || [])];
        switch (method) {
            case 'create':
                newFiles = [...(files || []), { file, image }];
                break;
            case 'update':
                newFiles[index] = { file, image } as any;
                break;
            case 'delete':
                newFiles = (files || []).filter((f) => f.file.name !== file.name);
                break;
        }

        setFiles(newFiles);
        field.onChange(newFiles);
    };


    const FcFirstImage = ({ onClick, src, className }: { onClick: any, src?: string, className?: string }) => {
        return (
            <Image
                alt="Product image"
                className={cn("aspect-square w-full rounded-md object-cover transition-all hover:opacity-75 cursor-pointer hover:brightness-90 ",
                    src ? "  hover:brightness-90" : "border-dashed border-4 border-gray-300",
                    className)}
                height="300"
                key={src}
                src={src || "/placeholder.svg"}
                width="300"
                onClick={onClick}
            />
        )
    }

    return (
        <Card className="overflow-hidden border-none shadow-none p-0 m-0">
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
                        <div className="relative aspect-square ">
                            {files?.length ?
                                <TableItemWrapper
                                    variant="modal"
                                    onSubmit={handleSingleChange(0)}
                                    clickArea={<FcFirstImage src={URL.createObjectURL(files[0]?.file) || files[0]?.image?.url} onClick={handleImageClick} />}
                                >
                                    <ImageEditor isRequired={isRequired} label={fieldConfigItem?.label || label} file={files[0]?.file} image={files[0]?.image} onClose={handleSingleChange(0)} />
                                </TableItemWrapper>
                                : <FcFirstImage src={!fieldProps.multiple && ((files as any)?.file ? (isObject((files as any)?.file) && URL.createObjectURL((files as any)?.file)) : (files as any)?.image?.url)} onClick={handleImageClick} />
                            }
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {files?.length === 1 ?
                                <FcFirstImage onClick={handleImageClick} src={'/uploads/image-upload.svg'} className="border-dashed border-2 border-gray-300 rounded-md object-contain" />
                                : isArray(files) ? <>
                                    {files?.slice(1).map(({ file, image }, index) => (
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
                                </> : null
                            }


                            <FormControl >
                                <input
                                    type="file"
                                    multiple={fieldProps.multiple}
                                    className="hidden"
                                    {...fieldPropsWithoutShowLabel}
                                    onChange={handleAddFile}
                                    ref={fileInputRef}
                                    value=""
                                />
                            </FormControl>
                        </div>
                    </div>
                    <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
                    <FormMessage />
                </CardContent>
            </FormItem>
        </Card >
    );
}

async function createFileFromUrl(url: string, filename: string): Promise<File> {
    try {
        // Fetch the image data
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch the image.');
        }

        // Convert the response to a Blob
        const blob = await response.blob();

        // Create a File from the Blob
        const file = new File([blob], filename, { type: blob.type });

        return file;
    } catch (error) {
        console.error('Error creating file from URL:', error);
        throw error;
    }
}

