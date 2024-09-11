import TableItemWrapper, { OnSubmitProps } from "@/components/list/list-item-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { handleApiCrudRequest } from "@/services/crud-service";
import { ImageType } from "@/types/image-type";
import { isArray, isObject } from "lodash";
import { Trash } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ImageEditor from "../../image/image-editor";
import AutoFormLabel from "../common/label";
import AutoFormTooltip from "../common/tooltip";
import { AutoFormInputComponentProps } from "../types";
import { useToast } from "@/components/providers/toast-provider";


interface FileWithDescription {
    file?: File;
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
    const notify = useToast();

    useEffect(() => {
        if (isArray(field.value)) {
            setFiles(field.value.map((image: ImageType) => ({ image })));
        } else if (isObject(field.value)) {
            setFiles([{ image: field.value as ImageType }]);
        }
    }, [field.value]);

    const handleAddFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const newImage = {
            name: file.name,
            description: "",
            url: URL.createObjectURL(file)
        };

        if (fieldProps.multiple) {
            setFiles(prevState => {
                const updatedFiles = [...(prevState || []), { file, image: newImage }];
                field.onChange(updatedFiles.map(f => f.image));
                return updatedFiles;
            });
        } else {
            setFiles([{ file, image: newImage as ImageType }]);
            field.onChange(newImage);
        }
    };

    const handleImageClick = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageDelete = async (index: number) => {
        const newFiles = (files || []).filter((_, i) => i !== index);
        setFiles(newFiles);
        if (files?.[index].image?.id) {
            const data = {
                where: {
                    id: files[index].image.id
                }
            }
            const res = await handleApiCrudRequest(data, 'image', 'delete')

            notify('Item removido', { type: 'info' })
        }
        field.onChange(newFiles.map(f => f.image));

    };

    const handleSingleChange = (index: number) => (props: OnSubmitProps) => {
        const { item: { file, image }, method } = props;
        let newFiles = [...(files || [])];
        switch (method) {
            case 'create':
                newFiles = [...(files || []), { file, image }];
                break;
            case 'update':
                newFiles[index] = { file, image };
                break;
            case 'delete':
                newFiles = newFiles.filter((_, i) => i !== index);
                break;
        }
        setFiles(newFiles);
        field.onChange(newFiles.map(f => f.image));
    };

    const FcFirstImage = ({ onClick, src, className, index }: { onClick: any, src?: string, className?: string, index?: number }) => {
        return (<span className="w-full relative group">

            <Image
                alt="Product image"
                className={cn("aspect-square w-full rounded-md object-cover transition-all hover:opacity-75 cursor-pointer hover:brightness-90 ",
                    src ? "  hover:brightness-90" : "border-dashed border-4 border-gray-300",
                    className)}
                height="300"
                key={src}
                src={src || '/uploads/image-upload.svg'}
                width="300"
                onClick={onClick}
            />
            {index !== undefined ?
                <button
                    title="Remover Imagem"
                    className="absolute z-20 right-0 top-0 aspect-square rounded-bl-xl p-1 bg-white transition-all"
                    onClick={(e) => { e.preventDefault(); handleImageDelete(index) }}
                    aria-label="Remover imagem">
                    <Trash className="text-red-500 hover:text-neutral-300" size={30} />
                </button>


                : null
            }
        </span>
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
                                    clickArea={<FcFirstImage src={files[0]?.image?.url || ""} index={0} onClick={handleImageClick} />}
                                >
                                    <ImageEditor isRequired={isRequired} label={fieldConfigItem?.label || label} file={files[0]?.file} image={files[0]?.image} onClose={handleSingleChange(0)} />
                                </TableItemWrapper>
                                : <FcFirstImage src={!fieldProps.multiple && files?.[0]?.image?.url || ""} index={0} onClick={handleImageClick} />
                            }
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {files?.length === 1 ?
                                <FcFirstImage onClick={handleImageClick} className="border-dashed border-2 border-gray-300 rounded-md object-contain" />
                                : isArray(files) && fieldProps.multiple ? <>
                                    {files?.slice(1).map(({ image }, index) => (
                                        <TableItemWrapper
                                            key={index}
                                            variant="modal"
                                            onSubmit={handleSingleChange(index + 1)}
                                            clickArea={<FcFirstImage index={index + 1} src={image?.url || ""} onClick={handleImageClick} />}
                                        >
                                            <ImageEditor isRequired={isRequired} label={fieldConfigItem?.label || label} file={undefined} image={image} onClose={handleSingleChange(index + 1)} />
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