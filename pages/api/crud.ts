import prisma from "@/lib/prisma";
import { Image, Prisma, PrismaClient } from "@prisma/client";
import { isObject } from "lodash";
import type { NextApiRequest, NextApiResponse } from "next";

/**
 * @swagger
 * /api/crud:
 *   post:
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
        console.log(command);
        res = await prisma[table][method](command);
        if (Object.keys(nestedItems).length) {
          Object.entries(nestedItems).forEach(async ([key, value]) => {
            const nestedTable = key.substring(0, key.length - 1);
            const nestedRes: any[] = [];
            console.log(nestedTable);
            value.forEach(async (item: any) => {
              console.log(item);
              nestedRes.push(await prisma[nestedTable][method](item));
            });
            res.result[key] = nestedRes;
          });
          console.log(res.result);
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
    console.log(error);
    throw new Error("Erro ao executar a operação");
  }
}

export async function handleApiRequest(
  data: CrudRequest["data"],
  table: CrudRequest["table"],
  method: CrudRequest["method"]
) {
  console.log(data);
  const response = await fetch(`/api/crud`, {
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
    console.log(data);

    const formData = new FormData();

    // Adiciona cada arquivo e suas informações ao formData
    data.forEach(({ file, image }) => {
      formData.append(`file`, file);
      formData.append(`imageUrl`, image?.url);
      formData.append(`imageName`, image?.name || file.name);
      formData.append(`imageDescription`, image?.description || "");
    });

    console.log(formData);

    // Envia os dados para o servidor
    const response = await fetch(`/api/file`, {
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
    console.log(json);

    // Retorna os dados da imagem criada
    return json;
  } catch (error) {
    console.error("Erro ao criar imagem:", error);
    throw new Error("Não foi possível criar a imagem");
  }
}

function formatUpdateCommand(
  table: CrudRequest["table"],
  data: CrudRequest["data"]
): { command: Prisma.ProjectUpdateArgs; nestedItems: any[] } {
  console.log(data);
  const { id, ...fields } = data;

  const updateData: any = {};
  const nestedItems: any = {};

  function handleNestedUpdates(value: any, enableId?: boolean) {
    return value.map((item: any) => {
      let { id: nestedId, ...nestedData } = item;

      if (enableId) {
        return {
          where: { id: nestedId },
          data: {
            [`${String(table)}Id`]: id,
          },
        };
      }
      delete nestedData[String(table) + "Id"];
      console.log(nestedData);
      return {
        where: { id: nestedId },
        data: {
          ...nestedData,
        },
      };
    });
  }

  console.log(fields);
  let fkId;
  Object.entries(fields).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      const isList = Prisma.dmmf.datamodel.models
        .find((m) => m.name.toLowerCase() === String(table).toLowerCase())
        ?.fields.find((f) => f.name === key)?.isList;

      console.log(Prisma.dmmf.datamodel.models.find((m) => m.name === table));

      const method = isList ? "updateMany" : "update";

      console.log({ [key]: method });

      if (method === "updateMany") {
        updateData[key] = {
          [method]: handleNestedUpdates(value),
        };
        nestedItems[key] = handleNestedUpdates(value, true);
      } else {
        console.log(key);
        console.log(value);
        fkId = { [`${String([key])}Id`]: value[0].id };
        console.log(updateData);
      }
    } else if (isObject(value)) {
      fkId = { [`${String([key])}Id`]: value.id };
    } else {
      // Handle direct fields
      updateData[key] = value;
    }
  });
  console.log(updateData);
  console.log(nestedItems);
  return {
    command: {
      where: { id },
      data: { ...updateData, ...(fkId || {}) },
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

  Object.entries(fields).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      const isList = Prisma.dmmf.datamodel.models
        .find((m) => m.name.toLowerCase() === String(table).toLowerCase())
        ?.fields.find((f) => f.name === key)?.isList;

      fields[key] = {
        connect: isList
          ? value.map((item: any) => ({
              id: item.id,
            }))
          : { id: value[0].id },
      };
    } else if (isObject(value)) {
      fields[key] = {
        connect: {
          id: value.id,
        },
      };
    }
  });
  console.log(fields);
  return {
    data: fields,
  };
}
