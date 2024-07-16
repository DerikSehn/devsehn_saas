import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { SubmitHandler, useForm } from "react-hook-form"
import Image from "next/image"
import { AutoFormInputComponentProps } from "../types"
import { FormItem, FormLabel, FormDescription, FormControl } from "../../form"

interface FormData {
    description: string;
    image: File;
}

export default function AutoFormImage(props: AutoFormInputComponentProps) {
    const { label, isRequired, field, fieldConfigItem, /* fieldProps */ } = props;
    return (
        <FormItem className="flex flex-col items-start space-y-4">
            <div className="space-y-1 leading-none">
                <FormLabel>
                    {label}
                    {isRequired && <span className="text-destructive"> *</span>}
                </FormLabel>

            </div>
            {fieldConfigItem.description && (
                <FormDescription>{fieldConfigItem.description}</FormDescription>
            )}<FormControl>
                <ImageField
                    onUpload={field.onChange}
                    formProps={props}
                />
            </FormControl>

        </FormItem>
    );
}


export function ImageField({ onUpload, formProps }: { onUpload: (data: { file: File; description: string }) => Promise<void>, formProps: AutoFormInputComponentProps }) {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FormData>()
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [image, setImage] = useState<File | null>(null)


    const handleImageUpload = (event: any) => {
        const file = event.target.files[0]
        if (file) {
            setImage(file)
            setPreviewImage(URL.createObjectURL(file))
        }
    }

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (image) {
            await onUpload({ file: image, description: formProps.label! })
        }
    }

    return (
        <div className="flex items-center h-full justify-center bg-neutral-100">
            <div className="flex w-full max-w-4xl rounded-lg border border-neutral-200">
                <div className="flex flex-col items-center justify-center w-1/2 bg-neutral-200 p-6 rounded-l-lg">
                    <div className="w-full rounded-lg flex items-center justify-center">
                        {previewImage ? (
                            <Image
                                src={previewImage}
                                alt="Preview"
                                width={200}
                                height={200}
                                className="object-cover w-full h-auto rounded-3xl"
                            />
                        ) : (
                            <div className="flex items-center justify-center">
                                <UploadIcon className="w-8 h-8 text-muted-foreground" />
                            </div>
                        )}
                    </div>
                    <Input type="file" id="image" {...register("image", { required: "Imagem é obrigatória" })} onChange={handleImageUpload} className="mt-4" />
                    {errors.image && <p className="mt-1 text-red-500">{errors.image?.message}</p>}
                </div>
                <div className="w-1/2 bg-card p-6 rounded-r-lg">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {formProps.label ? null : (
                            <div className=" max-h-44">
                                <Label htmlFor="description">Descrição</Label>
                                <Textarea id="description" {...register("description", { required: "Descrição é obrigatória" })} className="mt-2 max-h-44" />
                                {errors.description && <p className="mt-1 text-red-500">{errors.description?.message}</p>}
                            </div>
                        )}
                        <Button type="submit" disabled={isSubmitting} className="w-full">
                            {isSubmitting ? "Enviando..." : "Enviar"}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

function UploadIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
    )
}

function XIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}
