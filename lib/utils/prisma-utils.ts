import { Prisma } from "@prisma/client";
import { isArray, isObject } from "lodash";

export function removePrismaForeignKeys(item: object) {
  console.log(item);
  const obj = Object.fromEntries(
    Object.entries(item).filter(([key]) => !key.endsWith("Id"))
  );
  console.log(obj);
  return obj;
}

export function formatImageFields({
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
  if (columns[key]?.type === "Image") {
    if (columns[key]?.isList) {
      console.log(value);
      // if is an array, then it's already been treated right by default
      if (!isArray(value)) {
        updateData[key] = generateImageCommand(value);
      }
    } else {
      updateData[key] = generateImageCommandOneToOne(value);
    }
  }
}

export const generateImageCommand = (item: any) => {
  const { url, ...itemWithoutUrl } = item;

  const command = item.id
    ? getUpsertCommand(itemWithoutUrl)
    : getCreateCommand(itemWithoutUrl);

  return command;
};

export const generateImageCommandOneToOne = (item: any) => {
  const { url, ...itemWithoutUrl } = item;

  const command = item.id
    ? getUpdateCommand(itemWithoutUrl)
    : getCreateCommand(itemWithoutUrl);

  return command;
};

export const generateImageArrayCommand = (imageArray: any[]) => {
  return {
    upsert: imageArray.map((item) => {
      const { url, ...itemWithoutUrl } = item;

      return item.id
        ? {
            update: {
              data: itemWithoutUrl,
              where: {
                id: item.id,
              },
            },
            create: {
              ...itemWithoutUrl,
            },
            where: {
              id: item.id,
            },
          }
        : {
            create: {
              ...itemWithoutUrl,
            },
          };
    }),
  };
};

function getUpdateCommand(item: any) {
  console.log("updating");
  return {
    update: {
      data: item,
      where: {
        id: item.id,
      },
    },
  };
}

function getUpsertCommand(item: any) {
  return {
    upsert: {
      create: {
        ...item,
      },
      update: {
        ...item,
      },
      where: {
        id: item.id,
      },
    },
  };
}

function getCreateCommand(item: any) {
  return {
    create: {
      ...item,
    },
  };
}

export function getRelatedTable(key: string, table: string) {
  console.log(table);
  console.log(key);
  const model = Prisma.dmmf.datamodel.models.find(
    (m) => m.name.toLowerCase() === table.toLowerCase()
  );
  console.log(key);

  let result;

  const field = model?.fields.find((f) => f.name === key);
  console.log(field);
  result = field?.relationToFields?.length
    ? field.relationToFields?.[0]
    : undefined;

  console.log(result);
  return result?.toLowerCase();
}

export function hasRelation({ key, table }: { key: string; table: string }) {
  return getRelatedTable(key, table) !== undefined;
}

export function formatPrimitiveFields({
  key,
  updateData,
  value,
}: {
  updateData: any;
  key: string;
  value: any;
}) {
  if (!isObject(value)) {
    updateData[key] = value;
    console.log(updateData[key]);
  }
}

export function formatIncludeFields(columns: any) {
  return Object.entries(columns).reduce((acc, [name, column]) => {
    if ((column as any).isList) {
      (acc as any)[name] = true;
    }
    return acc;
  }, {});
}
