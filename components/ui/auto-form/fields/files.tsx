<<<<<<< HEAD
import TableItemWrapper, { OnSubmitProps } from "@/components/list/list-item-wrapper";
=======
import TableItemWrapper from "@/components/list/list-item-wrapper";
>>>>>>> b2472f7 (chore:restaurando sistema local)
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Image as ImageType } from "@prisma/client";
import { isArray, isObject } from "lodash";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ImageEditor from "../../image/image-editor";
import { Textarea } from "../../textarea";
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
    console.log(fieldProps)
    const showLabel = _showLabel === undefined ? true : _showLabel;
    const [files, setFiles] = useState<FileWithDescription[] | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

<<<<<<< HEAD
    const handleRemoveClick = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        field.onChange(newFiles.map((f) => f.file));
    };

<<<<<<< HEAD
=======
>>>>>>> 65711d3 (feat(App):many diffs, polished image and file upload, returned to local development, enhanced visual layout in the landing page, and more)
    console.log(files)

    const convertImagesToItem = async () => {

<<<<<<< HEAD
=======
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
>>>>>>> b2472f7 (chore:restaurando sistema local)
        const selectedFiles: FileWithDescription[] = Array.from(e.target.files || []).map((file, index) => ({
            file,
            image: {
                ...files.find((f) => f.file === file)?.image,
                url: URL.createObjectURL(file),
=======
        let res = undefined;
        if (isArray(field.value)) {
            res = await Promise.all(field.value.map(async (image) => {
                const file = await createFileFromUrl(image.url, image.name);
                return { file, image };
>>>>>>> 65711d3 (feat(App):many diffs, polished image and file upload, returned to local development, enhanced visual layout in the landing page, and more)
            }
            ));
            setFiles(res);
        } else if (isObject(field.value)) {
            res = await createFileFromUrl(field.value.url, field.value.name);
            setFiles({ file: res, image: field.value });
        }

    }

    useEffect(() => {
        convertImagesToItem();
    }, [])

    /* 
        const handleRemoveClick = (index: number) => {
            const newFiles = files.filter((_, i) => i !== index);
            setFiles(newFiles);
            field.onChange(newFiles.map((f) => f.file));
        };
     */
    console.log(files)

    const handleAddFile = (e: ChangeEvent<HTMLInputElement>) => {

        console.log(e.target.files)
        const file = e.target.files?.[0];
        console.log(file)
        console.log(files)

        if (fieldProps.multiple) {
            setFiles(pvSt => {
                const obj = [...(pvSt || []), { file } as any]
                field.onChange(obj);
                return obj
            });

        } else {
            console.log({ file })
            setFiles({ file });
            field.onChange({
                file, image: {
                    name: file.name,
                    description: "",
                    url: URL.createObjectURL(file)
                }
            });

        }


    };

<<<<<<< HEAD
    const handleImageClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(fileInputRef.current)
=======
    const handleImageClick = () => {
>>>>>>> b2472f7 (chore:restaurando sistema local)
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

<<<<<<< HEAD
<<<<<<< HEAD
    const handleSingleChange = (
=======
    const handleSingleChange = (index: number) => (
>>>>>>> 65711d3 (feat(App):many diffs, polished image and file upload, returned to local development, enhanced visual layout in the landing page, and more)
        props: OnSubmitProps
    ) => {
        console.log(props)
        const { item: { file, image }, method } = props;

        let newFiles = [...files];
        switch (method) {
            case 'create':
                newFiles = [...files, { file, image }];
                break;
            case 'update':
                newFiles[index] = { file, image } as any;
                break;
            case 'delete':
                newFiles = files.filter((f) => f.file.name !== file.name);
                break;
        }
<<<<<<< HEAD
=======
    const handleSingleChange = (data: FileWithDescription) => {
        setFiles(pvSt => pvSt.map((f) => f.file === data.file ? data : f));
>>>>>>> b2472f7 (chore:restaurando sistema local)
=======
        console.log(newFiles)
        setFiles(newFiles);
        field.onChange(newFiles);
>>>>>>> 65711d3 (feat(App):many diffs, polished image and file upload, returned to local development, enhanced visual layout in the landing page, and more)
    };

    console.log(files)

    const FcFirstImage = ({ onClick, src, className }: { onClick: any, src?: string, className?: string }) => {
        console.log(src)
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
                {console.log(files)}
                <CardContent>
                    <div className="grid gap-2">
                        <div className="relative aspect-square ">
                            {files?.length ?
                                <TableItemWrapper
                                    variant="modal"
<<<<<<< HEAD
<<<<<<< HEAD
                                    onSubmit={handleSingleChange}
                                    clickArea={<FcFirstImage onClick={handleImageClick} />}
                                >
                                    <ImageEditor isRequired={isRequired} label={fieldConfigItem?.label || label} file={files[0]?.file} image={files[0]?.image} onClose={handleSingleChange} />
=======
                                    onSubmit={handleFileChange}
                                    clickArea={<FcFirstImage onClick={handleImageClick} />}
                                >
                                    <ImageEditor isRequired={isRequired} label={fieldConfigItem?.label || label} image={files[0]?.image} onSubmit={handleSingleChange} />
>>>>>>> b2472f7 (chore:restaurando sistema local)
=======
                                    onSubmit={handleSingleChange(0)}
                                    clickArea={<FcFirstImage src={URL.createObjectURL(files[0]?.file) || files[0]?.image?.url} onClick={handleImageClick} />}
                                >
                                    <ImageEditor isRequired={isRequired} label={fieldConfigItem?.label || label} file={files[0]?.file} image={files[0]?.image} onClose={handleSingleChange(0)} />
>>>>>>> 65711d3 (feat(App):many diffs, polished image and file upload, returned to local development, enhanced visual layout in the landing page, and more)
                                </TableItemWrapper>
                                : <FcFirstImage src={!fieldProps.multiple && (files?.file ? (isObject(files?.file) && URL.createObjectURL(files?.file)) : files?.image?.url)} onClick={handleImageClick} />
                            }
                        </div>
                        <div className="grid grid-cols-3 gap-2">
<<<<<<< HEAD
                            {
                                files.length === 1 ?
                                    <FcFirstImage onClick={handleImageClick} src={'/uploads/image-upload.svg'} className="border-dashed border-2 border-gray-300 rounded-md object-contain" />
                                    : files.slice(1).map(({ file, image }, index) => (
                                        <div key={index} className="relative aspect-square">
<<<<<<< HEAD
=======
                                            {console.log(image?.description, image?.url)}
>>>>>>> b2472f7 (chore:restaurando sistema local)
                                            <Image
                                                alt="Preview"
                                                className="aspect-square w-full rounded-md object-cover hover:opacity-75 hover:brightness-75 transition-all cursor-pointer"
                                                height="84"
                                                src={image?.url || URL.createObjectURL(file)}
                                                width="84"
                                                onClick={handleImageClick}
                                            />
                                            <button className="opacity-0 group-hover:opacity-90 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full aspect-square"
                                                onClick={() => handleRemoveClick(index)} aria-label="Remove image">
                                                <Trash2 className="text-red-600 group-hover:text-red-700" size={40} />
                                            </button>

                                        </div>
=======
                            {files?.length ? (
                                <>
                                    {files.slice(1).map(({ file, image }, index) => (
                                        <TableItemWrapper
                                            variant="modal"
                                            onSubmit={handleSingleChange(index + 1)}
                                            clickArea={<FcFirstImage src={URL.createObjectURL(file) || image?.url} onClick={handleImageClick} />}
                                        >
                                            <ImageEditor isRequired={isRequired} label={fieldConfigItem?.label || label} file={file} image={image} onClose={handleSingleChange(index + 1)} />
                                        </TableItemWrapper>
>>>>>>> 65711d3 (feat(App):many diffs, polished image and file upload, returned to local development, enhanced visual layout in the landing page, and more)
                                    ))}
                                    <FcFirstImage onClick={handleImageClick} />
                                </>
                            ) : (
                                null
                            )
                            }

                            <FormControl>
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
        </Card>
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

