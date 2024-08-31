import { Prisma } from "@prisma/client";
import prisma, { handleGetColumns } from "@/lib/prisma";
import { isArray, isObject } from "lodash";
import { CrudRequest } from "@/types/crud";
import {
  formatImageFields,
  formatIncludeFields,
  formatPrimitiveFields,
  formatRelationFields,
  hasRelation,
  removePrismaForeignKeys,
} from "@/lib/utils/prisma-utils";

export function formatUpdateCommand(
  table: string,
  data: { id: string | number; [key: string]: any }
): { command: Prisma.ProjectUpdateArgs; nestedItems: any[] } {
  const { id, ...fields } = data;

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

    formatRelationFields({ updateData, key, value, columns });

    formatPrimitiveFields({ updateData, key, value });

    formatImageFields({ updateData, key, value, columns });
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
    const { createItemsCommand, updateItemsCommand } = value.reduce(
      (acc: any, item: any) => {
        if (!item.id) {
          acc.createItemsCommand.push(removePrismaForeignKeys(item));
        } else {
          let itemWithoutId = { ...item };
          delete itemWithoutId["id"];
          delete itemWithoutId[`${table}Id`];

          acc.updateItemsCommand.push({
            where: { id: item.id },
            data: itemWithoutId,
          });
        }
        return acc;
      },
      { createItemsCommand: [], updateItemsCommand: [] }
    );

    const createCommand = createItemsCommand.length
      ? { create: createItemsCommand }
      : {};

    const updateCommand = updateItemsCommand.length
      ? { update: updateItemsCommand }
      : {};

    updateData[key] = {
      ...createCommand,
      ...updateCommand,
    };
  }
}
