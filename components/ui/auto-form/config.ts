import AutoFormCheckbox from "./fields/checkbox";
import AutoFormDate from "./fields/date";
import AutoFormEnum from "./fields/enum";
import AutoFormFile from "./fields/file";
<<<<<<< HEAD
import AutoFormFiles from "./fields/files";
=======
>>>>>>> 988440aef5afea92158899830dae6b4b0425a175
import AutoFormInput from "./fields/input";
import AutoFormNumber from "./fields/number";
import AutoFormRadioGroup from "./fields/radio-group";
import AutoFormSwitch from "./fields/switch";
import AutoFormTextarea from "./fields/textarea";

export const INPUT_COMPONENTS = {
  checkbox: AutoFormCheckbox,
  date: AutoFormDate,
  select: AutoFormEnum,
  radio: AutoFormRadioGroup,
  switch: AutoFormSwitch,
  textarea: AutoFormTextarea,
  number: AutoFormNumber,
  file: AutoFormFile,
<<<<<<< HEAD
  files: AutoFormFiles,
=======
>>>>>>> 988440aef5afea92158899830dae6b4b0425a175
  fallback: AutoFormInput,
};

/**
 * Define handlers for specific Zod types.
 * You can expand this object to support more types.
 */
export const DEFAULT_ZOD_HANDLERS: {
  [key: string]: keyof typeof INPUT_COMPONENTS;
} = {
  ZodBoolean: "checkbox",
  ZodDate: "date",
  ZodEnum: "select",
  ZodNativeEnum: "select",
  ZodNumber: "number",
};
