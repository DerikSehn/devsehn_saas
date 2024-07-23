"use client";
import { Form } from "@/components/ui/form";
import React from "react";
import { DefaultValues, FormState, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import AutoFormObject from "./fields/object";
import { Dependency, FieldConfig } from "./types";
import {
  ZodObjectOrWrapped,
  getDefaultValues,
  getObjectFormSchema,
} from "./utils";

export function AutoFormSubmit({
  children,
  className,
  disabled,
}: {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <Button type="submit" disabled={disabled} className={className}>
      {children ?? "Submit"}
    </Button>
  );
}

function AutoForm<SchemaType extends ZodObjectOrWrapped>({
  formSchema,
  values: valuesProp,
  onValuesChange: onValuesChangeProp,
  onParsedValuesChange,
  onSubmit: onSubmitProp,
  fieldConfig,
  children,
  className,
  dependencies,
}: {
  formSchema: SchemaType;
  values?: Partial<z.infer<SchemaType>>;
  onValuesChange?: (values: Partial<z.infer<SchemaType>>) => void;
  onParsedValuesChange?: (values: Partial<z.infer<SchemaType>>) => void;
  onSubmit?: (values: z.infer<SchemaType>) => void;
  fieldConfig?: FieldConfig<z.infer<SchemaType>>;
  children?:
<<<<<<< HEAD
  | React.ReactNode
  | ((formState: FormState<z.infer<SchemaType>>) => React.ReactNode);
=======
    | React.ReactNode
    | ((formState: FormState<z.infer<SchemaType>>) => React.ReactNode);
>>>>>>> 988440aef5afea92158899830dae6b4b0425a175
  className?: string;
  dependencies?: Dependency<z.infer<SchemaType>>[];
}) {
  const objectFormSchema = getObjectFormSchema(formSchema);
  const defaultValues: DefaultValues<z.infer<typeof objectFormSchema>> | null =
    getDefaultValues(objectFormSchema, fieldConfig);

  const form = useForm<z.infer<typeof objectFormSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? undefined,
    values: valuesProp,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const parsedValues = formSchema.safeParse(values);
    if (parsedValues.success) {
      onSubmitProp?.(parsedValues.data);
    }
  }

  const values = form.watch();
  // valuesString is needed because form.watch() returns a new object every time
  const valuesString = JSON.stringify(values);

  React.useEffect(() => {
    onValuesChangeProp?.(values);
    const parsedValues = formSchema.safeParse(values);
    if (parsedValues.success) {
      onParsedValuesChange?.(parsedValues.data);
    }
  }, [valuesString]);

  const renderChildren =
    typeof children === "function"
      ? children(form.formState as FormState<z.infer<SchemaType>>)
      : children;

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={(e) => {
<<<<<<< HEAD
            console.log(e)
            e.preventDefault();
            e.stopPropagation();
=======
>>>>>>> 988440aef5afea92158899830dae6b4b0425a175
            form.handleSubmit(onSubmit)(e);
          }}
          className={cn("space-y-5", className)}
        >
          <AutoFormObject
            schema={objectFormSchema}
            form={form}
            dependencies={dependencies}
            fieldConfig={fieldConfig}
          />

          {renderChildren}
        </form>
      </Form>
    </div>
  );
}

export default AutoForm;
