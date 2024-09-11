import AutoFormComplete from "@/components/ui/auto-form/fields/auto-complete";
import AutoFormFiles from "@/components/ui/auto-form/fields/files";
import AutoFormInput from "@/components/ui/auto-form/fields/input";
import AutoFormTextarea from "@/components/ui/auto-form/fields/textarea";

export const getFieldConfig = (columns: any[]) => {
  let config: any = {};

  columns.forEach((col) => {
    switch (col.name) {
      case "image":
      case "images":
        config[col.name] = {
          inputProps: {
            accept: "image/*",
            multiple: col.isList,
          },
          fieldType: AutoFormFiles,
        };
        return;
      case "name":
        config[col.name] = {
          inputProps: {
            type: "text",
          },
          fieldType: AutoFormInput,
          label: "Nome",
        };
        return;
      case "description":
        config[col.name] = {
          inputProps: {
            type: "text",
          },
          fieldType: AutoFormTextarea,
          label: "Descrição",
          description: "Insira a descrição",
        };
        return;
      case "password":
        config[col.name] = {
          inputProps: {
            type: "password",
          },
          label: "Senha",
          description: "Insira a senha",
        };
        return;
      default:
        break;
    }

    switch (col.type) {
      case "Int":
      case "Float":
      case "bigint":
        config[col.name] = {
          inputProps: {
            type: "number",
          },
          fieldType: AutoFormInput,
        };
        break;
    }

    if (col.isList || (col.relationName && col.name !== "id")) {
      const relatedTable = col.type;
      config[col.name] = {
        fieldType: AutoFormComplete,
        inputProps: {
          multiple: col.isList && !!col.relationName,
          type: relatedTable,
        },
      };
    }
  });

  return config;
};
