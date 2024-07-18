import TableItemWrapper, { OnSubmitProps } from "@/components/list/list-item-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Image as ImageType } from "@prisma/client";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
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
    fieldProps,
    field,
}: AutoFormInputComponentProps) {
    const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
    const showLabel = _showLabel === undefined ? true : _showLabel;
    const [files, setFiles] = useState<FileWithDescription[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleRemoveClick = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        field.onChange(newFiles.map((f) => f.file));
    };

    console.log(files)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e)

        const selectedFiles: FileWithDescription[] = Array.from(e.target.files || []).map((file, index) => ({
            file,
            image: {
                ...files.find((f) => f.file === file)?.image,
                url: URL.createObjectURL(file),
            }
        }));
        console.log(selectedFiles)
        setFiles(selectedFiles);
        field.onChange(selectedFiles);
    };

    const handleImageClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(fileInputRef.current)
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSingleChange = (
        props: OnSubmitProps
    ) => {
        console.log(props)
        const { item: { file, image }, method } = props;
        switch (method) {
            case 'create':
                setFiles(pvSt => [...pvSt, { file, image }]);
                break;
            case 'update':
                setFiles(pvSt => pvSt.map((f) => f.file === file ? { file, image } as any : f));
                break;
            case 'delete':
                setFiles(pvSt => pvSt.filter((f) => f.file !== file));
                break;
        }
    };


    const FcFirstImage = ({ onClick, src, className }: { onClick: any, src?: string, className?: string }) => {
        return (
            <Image
                alt="Product image"
                className={cn("aspect-square w-full rounded-md object-cover transition-all cursor-pointer hover:opacity-75 hover:brightness-90", className)}
                height="300"
                src={src || files[0]?.image?.url || "/uploads/image-upload.svg"}
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

                <CardContent>
                    <div className="grid gap-2">
                        <div className="relative aspect-square ">
                            {files.length ?
                                <TableItemWrapper
                                    variant="modal"
                                    onSubmit={handleSingleChange}
                                    clickArea={<FcFirstImage onClick={handleImageClick} />}
                                >
                                    <ImageEditor isRequired={isRequired} label={fieldConfigItem?.label || label} file={files[0]?.file} image={files[0]?.image} onClose={handleSingleChange} />
                                </TableItemWrapper>
                                : <FcFirstImage onClick={handleImageClick} />
                            }
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {
                                files.length === 1 ?
                                    <FcFirstImage onClick={handleImageClick} src={'/uploads/image-upload.svg'} className="border-dashed border-2 border-gray-300 rounded-md object-contain" />
                                    : files.slice(1).map(({ file, image }, index) => (
                                        <div key={index} className="relative aspect-square">
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
                                    ))}
                            <FormControl>
                                <input
                                    type="file"
                                    multiple
                                    className="hidden"
                                    {...fieldPropsWithoutShowLabel}
                                    onChange={handleFileChange}
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
