import { Prisma } from "@prisma/client";
import { isArray, isObject } from "lodash";

export function removePrismaForeignKeys(item: object) {
  const obj = Object.fromEntries(
    Object.entries(item).filter(([key]) => !key.endsWith("Id"))
  );

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
  const model = Prisma.dmmf.datamodel.models.find(
    (m) => m.name.toLowerCase() === table.toLowerCase()
  );

  let result;

  const field = model?.fields.find((f) => f.name === key);

  result = field?.relationToFields?.length
    ? field.relationToFields?.[0]
    : undefined;

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

export function formatRelationFields({
  key,
  updateData,
  value,
  columns,
  method = "update",
}: {
  updateData: any;
  key: string;
  value: any;
  columns: any;
  method?: "create" | "update";
}) {
  if (columns[key]?.isList && value.every(onlyHasId)) {
    const command = {
      create: { connect: value.map((item: any) => ({ id: item.id })) },
      update: { set: value.map((item: any) => ({ id: item.id })) },
    };
    updateData[key] = command[method];
  }
}

export function onlyHasId(obj: any) {
  const keys = Object.keys(obj);
  const objLength = keys.length;
  const objName = keys[0];

  return objLength === 1 && objName === "id";
}
