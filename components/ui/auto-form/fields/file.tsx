import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trash2, UploadIcon } from "lucide-react";
import Image from "next/image";
<<<<<<< HEAD
import { ChangeEvent, useEffect, useState } from "react";
=======
import { ChangeEvent, useState } from "react";
>>>>>>> 988440aef5afea92158899830dae6b4b0425a175
import { Button } from "../../button";
import AutoFormLabel from "../common/label";
import AutoFormTooltip from "../common/tooltip";
import { AutoFormInputComponentProps } from "../types";

export default function AutoFormFile({
  label,
  isRequired,
  fieldConfigItem,
  fieldProps,
  field,
}: AutoFormInputComponentProps) {
  const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
<<<<<<< HEAD
<<<<<<< HEAD
=======
  console.log(fieldPropsWithoutShowLabel)
>>>>>>> 988440aef5afea92158899830dae6b4b0425a175
=======
  console.log(fieldProps)
>>>>>>> 65711d3 (feat(App):many diffs, polished image and file upload, returned to local development, enhanced visual layout in the landing page, and more)
  const showLabel = _showLabel === undefined ? true : _showLabel;
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

<<<<<<< HEAD
  console.log(fileUrl)
  useEffect(() => {
    setFileUrl(field.value)
  }, [field.value])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
=======
  console.log(field)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

>>>>>>> 988440aef5afea92158899830dae6b4b0425a175
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
    <FormItem>
      {showLabel && (
        <AutoFormLabel
          label={fieldConfigItem?.label || label}
          isRequired={isRequired}
        />
      )}
      {!file && !field.value && (
        <div className="relative flex items-center justify-center h-40">
          <FormControl>
            <Input
              type="file"
              {...fieldPropsWithoutShowLabel}
              onChange={handleFileChange}
              className="flex items-center justify-center h-40 border-dashed border-4 cursor-pointer"
              value={""}
            />
          </FormControl>
          <UploadIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-500" size={40} />
        </div>
      )}
      {(file || field.value) && (
        <div className="grid grid-cols-2 gap-2 rounded-lg border p-2 text-black focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-neutral-100 dark:text-black dark:focus-visible:ring-0 dark:focus-visible:ring-offset-0">
          <div className="relative aspect-square">
            <Image
              src={field.value?.url || fileUrl || ""}
              alt="Preview"
              fill
              className="object-cover w-full h-auto"
            />
          </div>
          <Button variant={'outline'} className="group flex items-center h-full" onClick={handleRemoveClick} aria-label="Remove image">
            <Trash2 className="text-red-500 group-hover:text-red-700" size={40} />
          </Button>
        </div>
      )}
      <AutoFormTooltip fieldConfigItem={fieldConfigItem} />
      <FormMessage />
    </FormItem>
  );
}
