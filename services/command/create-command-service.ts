import { handleGetColumns } from "@/lib/prisma";
import {
  formatImageFields,
  formatIncludeFields,
  formatPrimitiveFields,
  formatRelationFields,
  hasRelation,
} from "@/lib/utils/prisma-utils";
import { CrudRequest } from "@/types/crud";
import { Prisma } from "@prisma/client";

export function formatCreateCommand(
  table: CrudRequest["table"],
  data: CrudRequest["data"]
): Prisma.ProjectCreateArgs {
  const { id, ...fields } = data;

  const updateData: any = {};

  const columns = Object.fromEntries(
    handleGetColumns(table as CrudRequest["table"])?.map((column) => [
      column.name,
      column,
    ]) as any
  );

  const include = formatIncludeFields(columns);

  Object.entries(fields).forEach(([key, value]) => {
    formatListFields({ updateData, columns, key, value });

    formatRelationFields({ updateData, key, value, columns, method: "create" });

    formatPrimitiveFields({ updateData, key, value });

    formatImageFields({ updateData, key, value, columns });
  });

  return {
    data: updateData,
    include,
  };
}

function formatListFields({
  key,
  columns,
  updateData,
  value,
}: {
  updateData: any;
  columns: any;
  key: string;
  value: any;
}) {
  if (columns[key]?.isList) {
    updateData[key] = {
      create: value.map((item: any) => {
        let itemWithoutId = { ...item };
        delete itemWithoutId["id"];

        return {
          ...itemWithoutId,
        };
      }),
    };
  }
}
