import { Prisma } from "@prisma/client";
import { handleGetColumns } from "@/lib/prisma";
import { isObject, isObjectLike } from "lodash";
import { CrudRequest } from "@/types/crud";
import {
  formatImageFields,
  formatIncludeFields,
  formatPrimitiveFields,
  hasRelation,
} from "@/lib/utils/prisma-utils";

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
  console.log(columns);
  const include = formatIncludeFields(columns);
  console.log(include);

  Object.entries(fields).forEach(([key, value]) => {
    formatListFields({ updateData, columns, key, value });
    console.log(updateData);
    formatRelationFields({ updateData, table, key, value });
    console.log(updateData);
    formatPrimitiveFields({ updateData, key, value });
    console.log(updateData);
    console.log(key);
    console.log(value);
    console.log(table);
    formatImageFields({ updateData, key, value, columns });
    console.log(updateData);
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
function formatRelationFields({
  key,
  table,
  updateData,
  value,
}: {
  updateData: any;
  table: any;
  key: string;
  value: any;
}) {
  if (hasRelation({ key, table: table })) {
    updateData[key] = {
      connect: {
        id: value,
      },
    };
  }
}
