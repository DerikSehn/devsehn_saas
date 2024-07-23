<<<<<<< HEAD
<<<<<<< HEAD
import React, { useEffect, useState, ChangeEvent, BaseSyntheticEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import { Image as ImageType } from "@prisma/client";
import { Trash2, UploadIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
=======
import { OnSubmitProps } from "@/components/list/list-item-wrapper";
import { Button } from "@/components/ui/button";
>>>>>>> 65711d3 (feat(App):many diffs, polished image and file upload, returned to local development, enhanced visual layout in the landing page, and more)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Image as ImageType } from "@prisma/client";
import { ImagePlusIcon, UploadIcon } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Textarea } from "../textarea";

interface ImageEditorProps {
    image?: ImageType;
    onClose: (props: OnSubmitProps) => void;
    label: string;
    isRequired: boolean;
    file: File;
}

const ImageEditor = ({ image, onClose, file }: ImageEditorProps) => {

    const [values, setValues] = useState({
        image: {
            ...image,
            url: URL.createObjectURL(file) || ""
        }, file
    });
    const handleChange = (e: any) => {
        const { name, value } = e.target;

        const keys = name.split('.');

        let newValue = { ...values };

        let current = newValue;
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }

        console.log(e.target.files)
        /* @ts-ignore */
        current[keys[keys.length - 1]] = e.target?.files?.[0] || value;

        console.log(newValue)
        setValues(newValue);
    };

    const handleSaveClick = () => {
        onClose({
            item: values as any,
            method: "update",
        });
    };

    return (
        <Card className="overflow-hidden border-none">
            <CardHeader>
                <CardTitle>Ajustes de Imagem</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="form-item">
                        Imagem
                        <ImageUploader key={values.file?.name} name="file" value={values.file} onChange={handleChange} />
                    </div>
                    <div className="form-item">
                        Nome
                        <Input name="image.name" value={values.image.name} onChange={handleChange} />
                    </div>
                    <div className="form-item">
                        Descrição
                        <Textarea name="image.description" value={values.image.description} onChange={handleChange} />
                    </div>

                    <Button onClick={handleSaveClick} className="w-full">Salvar</Button>
                </div>
            </CardContent>
=======
/**
 * @file ImageEditor.tsx
 * @description Componente para editar imagens com suporte para pré-visualização e descrição.
 */

import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Image as ImageType } from "@prisma/client";
import { url } from "inspector";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { z } from "zod";
import AutoFormLabel from "../auto-form/common/label";
import AutoFormTooltip from "../auto-form/common/tooltip";
import AutoFormFile from "../auto-form/fields/file";

interface ImageEditorProps {
    image?: ImageType;
    onSubmit: (image: { id?: number, name: string, description: string, file?: File }) => void;
    label: string;
    file?: File
    isRequired: boolean;
}

const ImageEditor = ({ image, onSubmit, label, isRequired }: ImageEditorProps) => {


    const handleSubmit = (values: any) => {
        console.log(values);
        onSubmit({
            id: image?.id,
            name: values.name,
            description: values.description,
            file: values.image || undefined,
        });
    };

    const schema = z.object({
        name: z.string({ message: "Nome é obrigatório" }).describe("Nome"),
        description: z.string().optional().describe("Descrição"),
        image: z.any(),
    });

    return (
        <Card className="overflow-hidden border-none">
            <FormItem>
                <CardHeader>
                    <CardTitle>
                        <AutoFormLabel label={'Ajustes de Imagem'} className="text-2xl" isRequired={false} />
                    </CardTitle>
                    {/* <CardDescription>Ajustes de Imagem</CardDescription> */}
                </CardHeader>
                <CardContent>
                    {/* @ts-ignore */}
                    <AutoForm
                        className="border-none"
                        formSchema={schema} onSubmit={handleSubmit}
                        initialValues={...image}
                        fieldConfig={{
                            image: {

                                label: 'Imagem',
                                fieldType: AutoFormFile,
                            },
                        }}
                    >
                        <AutoFormSubmit>Salvar</AutoFormSubmit>
                    </AutoForm>
                </CardContent>
            </FormItem>
>>>>>>> b2472f7 (chore:restaurando sistema local)
        </Card>
    );
};

<<<<<<< HEAD
<<<<<<< HEAD
const ImageUploader = ({ field }) => {
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    useEffect(() => {
        setFileUrl(field.value);
    }, [field.value]);
=======
const ImageUploader = ({
    name,
    value,
    onChange
}: {
    name: string,
    value: Blob | MediaSource,
    onChange: (e: any) => void
}) => {
>>>>>>> 65711d3 (feat(App):many diffs, polished image and file upload, returned to local development, enhanced visual layout in the landing page, and more)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e)
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(fileInputRef.current)
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }

    };

    console.log(value)
    return (
        <div className="form-item">
            <div className="rounded-lg border p-2 text-black">
                <div className="relative aspect-video group">
                    <Image src={URL.createObjectURL(value) || ""} alt="Preview" fill className="object-cover w-full h-auto rounded-md  " />
                    <button title="Escolher Imagem" className="absolute right-2 top-2 aspect-square rounded-xl p-2 hover:bg-neutral-100/10 transition-all"

                        onClick={handleImageClick} aria-label="Remove image">
                        <ImagePlusIcon className="text-neutral-200 group-hover:text-neutral-300" size={40} />
                    </button>
                    {/*   <button title="Remover Imagem" className="absolute right-2 top-2 aspect-square rounded-xl p-2 hover:bg-neutral-100/10 transition-all group-hover:-translate-x-14 duration-500 opacity-0 group-hover:opacity-100" onClick={handleRemoveClick} aria-label="Remove image">
                            <X className="text-red-500" size={40} />
                        </button> */}
                </div>
            </div>
            <Input ref={fileInputRef} type="file" name={name} value="" onChange={handleFileChange} className="hidden" />

        </div>
    );
};

=======
>>>>>>> b2472f7 (chore:restaurando sistema local)
export default ImageEditor;
