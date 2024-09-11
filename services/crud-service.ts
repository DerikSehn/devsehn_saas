import prisma from "@/lib/prisma";

import { CrudRequest } from "@/types/crud";
import { formatCreateCommand } from "./command/create-command-service";
import { formatUpdateCommand } from "./command/update-command-service";

export async function handleCrudRequest(
  data: CrudRequest["data"],
  table: CrudRequest["table"],
  method: CrudRequest["method"]
) {
  try {
    let res: any;
    let command;
    switch (method) {
      case "create":
        command = formatCreateCommand(table, data);

        /* @ts-ignore */
        res = await prisma[table][method](command);

        return res;
      case "update":
        /* @ts-ignore */
        command = formatUpdateCommand(table, data).command;
        /* @ts-ignore */
        res = await prisma[table][method](command);

        /*  if (Object.keys(nestedItems).length) {
          nestedItems.forEach(async ({ key, updates }) => {
            const nestedRes: any[] = [];
            updates.forEach(async (command: any) => {
              
              nestedRes.push(await prisma[key][method](command));
            });
            res.result[key] = nestedRes;
          });
        } */
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

export async function handleApiCrudRequest(
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

export async function handleApiRequest(actionName: string, bodyContent: any) {
  const response = await fetch(`/api/protected/${actionName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyContent),
  });
  const json = await response.json();
  return json;
}
