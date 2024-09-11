import { CrudRequest } from "./crud";

export type Item = any;

export interface TableItemEditorProps {
  item?: Item;
  onClose({
    item,
    method,
  }: {
    item?: Item;
    method?: CrudRequest["method"];
  }): any;
  method: CrudRequest["method"];
  tableName: CrudRequest["table"];
}
