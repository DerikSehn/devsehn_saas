import prisma, { handleGetColumns } from "@/lib/prisma";
import { Image, Prisma, PrismaClient } from "@prisma/client";
import { isObject } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/protected/crud:
 *   post:
 *     summary: CRUD de um ou vários registros
 *     tags:
 *       - crud
 *     description: Endpoint para fazer crud de um ou vários registros.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               method:
 *                 type: string
 *               data:
 *                 type: object
 *               table:
 *                 type: string
 *     responses:
 *       200:
 *         description: returns the object according to the method provided.
 *       500:
 *         description: failed to load data.
 *
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method, data, table } = req.body;
    const result = await handleCrudRequest(data, table, method);
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}

export type CrudRequest = {
  method: keyof PrismaClient["account"];
  data: any;
  table: keyof PrismaClient;
};

async function handleCrudRequest(
  data: CrudRequest["data"],
  table: CrudRequest["table"],
  method: CrudRequest["method"]
) {
  try {
    let res: any;
    switch (method) {
      case "create":
        /* @ts-ignore */
        res = await prisma[table][method](formatCreateCommand(table, data));
        return res;
      case "update":
        /* @ts-ignore */
        const { command, nestedItems } = formatUpdateCommand(table, data);
        console.log(nestedItems);
        console.log(command);
        /* @ts-ignore */
        res = await (prisma as any)[table][method](command);
        if (Object.keys(nestedItems).length) {
          console.log(nestedItems);

          nestedItems.forEach(async ({ key, updates }) => {
            const nestedRes: any[] = [];
            updates.forEach(async (command: any) => {
              /* @ts-ignore */
              nestedRes.push(await prisma[key][method](command));
            });
            res.result[key] = nestedRes;
          });
        }
        return res;
      case "delete":
      case "findMany":
      case "findFirst":
        /* @ts-ignore */
        res = await prisma[table][method](data);
        return res;
    }
  } catch (error) {
    throw new Error("Erro ao executar a operação");
  }
}

export async function handleApiRequest(
  data: CrudRequest["data"],
  table: CrudRequest["table"],
  method: CrudRequest["method"]
) {
  const response = await fetch(`/api/protected/crud`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      method,
      data,
      table,
    }),
  });
  const json = await response.json();
  return json;
}

export type RawFileProps = {
  file: File;
  image: Image;
}[];

export async function handleCreateImage(data: RawFileProps): Promise<Image[]> {
  try {
    const formData = new FormData();

    // Adiciona cada arquivo e suas informações ao formData
    data.forEach(({ file, image }) => {
      formData.append(`file`, file);
      formData.append(`imageUrl`, image?.url);
      formData.append(`imageName`, image?.name || file.name);
      formData.append(`imageDescription`, image?.description || "");
    });

    // Envia os dados para o servidor
    const response = await fetch(`/api/protected/file`, {
      method: "POST",
      body: formData,
    });

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Falha ao enviar imagem: ${errorText}`);
    }

    // Converte a resposta para JSON
    const json: Image[] = await response.json();

    // Retorna os dados da imagem criada
    return json;
  } catch (error) {
    console.error("Erro ao criar imagem:", error);
    throw new Error("Não foi possível criar a imagem");
  }
}

function formatUpdateCommand(
  table: string,
  data: { id: string | number; [key: string]: any }
): { command: Prisma.ProjectUpdateArgs; nestedItems: any[] } {
  const { id, ...fields } = data;

  const updateData: any = {};
  const nestedItems: any[] = [];

  const columns = handleGetColumns(table as CrudRequest["table"]);

  /**
   *   The method was created in this way to enable the update of nested records.
   *
   *   For example:
   *
   * project: {
   *   name: ----updated,
   *   image: {
   *     url: ----updated,
   *   }
   * }
   *
   */
  function handleNestedUpdates(value: any, key: string, enableId?: boolean) {
    /*  [
    { key: 'image', updates: [] },
    {
      key: 'category',
      updates: [ { where: { id: 6 }, data: { productId: 6 } } ]
    }
  ] */
    return value.map((item: any) => {
      const { id: nestedId, ...nestedData } = item;
      console.log(item);
      if (enableId) {
        return {
          where: { id: nestedId },
          data: { [`${table}Id`]: id },
        };
      }
      delete nestedData[`${table}Id`];
      return {
        where: { id: nestedId },
        data: nestedData,
      };
    });
  }

  Object.entries(fields).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      const isList = Prisma.dmmf.datamodel.models
        .find((model) => model.name.toLowerCase() === table.toLowerCase())
        ?.fields.find((field) => field.name === key)?.isList;
      const relatedTable = getRelatedTable(key, table);

      if (isList) {
        nestedItems.push({
          key: relatedTable,
          updates: handleNestedUpdates(value, key, true),
        });
        updateData[key] = {
          connect: value.map((item: any) => ({ id: item.id })),
        };
      } else {
        updateData[key] = {
          connect: { id: value[0].id },
        };
      }
    } else if (isObject(value) && (value as any)?.id) {
      updateData[key] = value && {
        connect: { id: (value as any)?.id },
      };
    } else {
      updateData[key] = value;
    }
  });
  console.log(nestedItems);

  return {
    command: {
      where: { id: id as any },
      data: updateData,
    },
    nestedItems,
  };
}

function formatCreateCommand(
  table: CrudRequest["table"],
  data: CrudRequest["data"]
): Prisma.ProjectCreateArgs {
  /* connect lists to the parent prisma model */
  const { id, ...fields } = data;
  const columns = handleGetColumns(table as CrudRequest["table"]);

  Object.entries(fields).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      const isList = columns?.find((f) => f.name === key)?.isList;

      // if the item is a valid array, It shoud be connected depending on the isList flag
      if (value.length > 0) {
        fields[key] = {
          connect: isList
            ? value.map((item: any) => ({
                id: item.id,
              }))
            : { id: value[0].id },
        };
      } else {
        // if the item is not a valid array, It shoud be removed from the fields object
        delete fields[key];
      }
    } else if (isObject(value)) {
      fields[key] = {
        connect: {
          /* @ts-ignore */
          id: value.id,
        },
      };
    }
  });
  return {
    data: fields,
  };
}

function getRelatedTable(key: string, table: string) {
  const model = Prisma.dmmf.datamodel.models.find(
    (m) => m.name.toLowerCase() === table.toLowerCase()
  );

  let result;

  const field = model?.fields.find((f) => f.name === key);
  if (field?.isList) {
    result = field.relationToFields?.length
      ? field.relationToFields?.[0]
      : field.type;
  }
  result = field?.type;

  return result?.toLowerCase();
}
