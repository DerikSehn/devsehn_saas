import formidable from "formidable";
import { NextApiRequest } from "next";

export async function parseForm(req: NextApiRequest) {
  const form = formidable({ multiples: true });

  return new Promise<{ fields: any; files: any; error: any }>(
    (resolve, reject) => {
      form.parse(req, (err: any, fields: any, files: any) => {
        if (err) {
          reject({ fields: null, files: null, error: err });
        } else {
          resolve({ fields, files, error: null });
        }
      });
    }
  );
}
