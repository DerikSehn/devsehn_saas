import React, { useEffect, useState, ChangeEvent, BaseSyntheticEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import { Image as ImageType } from "@prisma/client";
import { Trash2, UploadIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OnSubmitProps } from "@/components/list/list-item-wrapper";

interface ImageEditorProps {
    image?: ImageType;
    onClose: (props: OnSubmitProps) => void;
    label: string;
    isRequired: boolean;
    file: File;
}

const ImageEditor = ({ image, onClose, label, isRequired, file }: ImageEditorProps) => {
    const schema = z.object({
        name: z.string({
            required_error: "Nome é obrigatório",
        }).describe("Nome"),
        description: z.string().optional().describe("Descrição"),
        url: z.string().describe("Imagem"),
    });

    const { handleSubmit, control, reset } = useForm({
        resolver: zodResolver(schema),
        defaultValues: image || { name: "", description: "", url: "" },
    });

    useEffect(() => {
        reset(image);
    }, [image, reset]);

    const onSubmit = (values, event: BaseSyntheticEvent<object, any, any> | undefined) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        onClose({
            item: {
                image: values,
                file,
            },
            method: "update",
        });
    };

    return (
        <Card className="overflow-hidden border-none">
            <CardHeader>
                <CardTitle>
                    Ajustes de Imagem
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} onClick={(e) => e.stopPropagation()} className="space-y-4">
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <div className="form-item">
                                Nome
                                <Input {...field} />
                            </div>
                        )}
                    />
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <div className="form-item">
                                Descrição
                                <Input {...field} />
                            </div>
                        )}
                    />
                    <Controller
                        name="url"
                        control={control}
                        render={({ field }) => (
                            <div className="form-item">
                                Imagem
                                <ImageUploader field={field} />
                            </div>
                        )}
                    />
                    <Button type="submit" className="w-full">Salvar</Button>
                </form>
            </CardContent>
        </Card>
    );
};

const ImageUploader = ({ field }) => {
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    useEffect(() => {
        setFileUrl(field.value);
    }, [field.value]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileUrl(URL.createObjectURL(selectedFile));
            field.onChange(selectedFile);
        }
    };

    const handleRemoveClick = () => {
        setFile(null);
        setFileUrl(null);
        field.onChange(null);
    };

    return (
        <div className="form-item">
            {!file && !field.value && (
                <div className="relative flex items-center justify-center h-40 border-dashed border-4 cursor-pointer">
                    <Input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 z-10 cursor-pointer" />
                    <UploadIcon className="text-gray-500" size={40} />
                </div>
            )}
            {(file || field.value) && (
                <div className="grid grid-cols-2 gap-2 rounded-lg border p-2 text-black">
                    <div className="relative aspect-square">
                        <Image src={fileUrl || ""} alt="Preview" fill className="object-cover w-full h-auto" />
                    </div>
                    <Button variant="outline" className="group flex items-center h-full" onClick={handleRemoveClick} aria-label="Remove image">
                        <Trash2 className="text-red-500 group-hover:text-red-700" size={40} />
                    </Button>
                </div>
            )}

        </div>
    );
};

export default ImageEditor;
