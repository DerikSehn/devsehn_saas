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
        </Card>
    );
};

export default ImageEditor;
