import { Prisma } from "@prisma/client";
import prisma, { handleGetColumns } from "@/lib/prisma";
import { isArray, isObject } from "lodash";
import { CrudRequest } from "@/types/crud";
import {
  formatImageFields,
  formatIncludeFields,
  formatPrimitiveFields,
  hasRelation,
} from "@/lib/utils/prisma-utils";

export function formatUpdateCommand(
  table: string,
  data: { id: string | number; [key: string]: any }
): { command: Prisma.ProjectUpdateArgs; nestedItems: any[] } {
  const { id, ...fields } = data;

  console.log(data);
  let updateData: any = {};
  const nestedItems: any[] = [];
  const columns = Object.fromEntries(
    handleGetColumns(table as CrudRequest["table"])?.map((column) => [
      column.name,
      column,
    ]) as any
  );

  const include = formatIncludeFields(columns);

  Object.entries(fields).forEach(([key, value]) => {
    formatListFields({ updateData, columns, key, value, table });
    console.log(updateData);
    formatRelationFields({ updateData, key, value, columns });
    console.log(updateData);
    formatPrimitiveFields({ updateData, key, value });
    console.log(updateData);
    formatImageFields({ updateData, key, value, columns });
    console.log(updateData);
  });

  return {
    command: {
      where: { id: id as any },
      data: updateData,
      include,
    },
    nestedItems,
  };
}

function formatListFields({
  key,
  columns,
  updateData,
  value,
  table,
}: {
  updateData: any;
  columns: any;
  key: string;
  value: any;
  table: any;
}) {
  if (columns[key]?.isList) {
    updateData[key] = {
      upsert: value.map((item: any) => {
        let itemWithoutId = { ...item };
        delete itemWithoutId["id"];
        delete itemWithoutId[`${table}Id`];

        return {
          create: {
            ...itemWithoutId,
          },
          update: {
            ...itemWithoutId,
          },
          where: {
            id: item.id || 0,
          },
        };
      }),
    };
    console.log(updateData[key]);
  }
}

function formatRelationFields({
  key,
  updateData,
  value,
  columns,
}: {
  updateData: any;
  key: string;
  value: any;
  columns: any;
}) {
  if (columns[key]?.isList && value.every(onlyHasId)) {
    updateData[key] = {
      set: value.map((item: any) => ({ id: item.id })),
    };
  }
}

function onlyHasId(obj: any) {
  const keys = Object.keys(obj);
  const objLength = keys.length;
  const objName = keys[0];

  return objLength === 1 && objName === "id";
}
