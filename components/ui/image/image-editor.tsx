import { OnSubmitProps } from "@/components/list/list-item-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Image as ImageType } from "@prisma/client";
import { ImagePlusIcon } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
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
        },
        file
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        let newValue = { ...values };
        let current = newValue;

        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }

        current[keys[keys.length - 1]] = e.target?.files?.[0] || value;
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
        </Card>
    );
};

const ImageUploader = ({ name, value, onChange }: { name: string, value: Blob | MediaSource, onChange: (e: any) => void }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e);
    };

    const handleImageClick = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="form-item">
            <div className="rounded-lg border p-2 text-black">
                <div className="relative aspect-video group">
                    <Image src={URL.createObjectURL(value) || ""} alt="Preview" fill className="object-cover w-full h-auto rounded-md" />
                    <button
                        title="Escolher Imagem"
                        className="absolute right-2 top-2 aspect-square rounded-xl p-2 hover:bg-neutral-100/10 transition-all"
                        onClick={handleImageClick}
                        aria-label="Escolher imagem">
                        <ImagePlusIcon className="text-neutral-200 group-hover:text-neutral-300" size={40} />
                    </button>
                </div>
            </div>
            <Input ref={fileInputRef} type="file" name={name} value="" onChange={handleFileChange} className="hidden" />
        </div>
    );
};

export default ImageEditor;
