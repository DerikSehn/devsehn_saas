import prisma from "@/lib/prisma";
import { FileRequestProps } from "@/types/file";
import { ImageType } from "@/types/image-type";
import { Image } from "@prisma/client";
import { isArray } from "lodash";

// Function to handle the creation of images in the backend
export async function createFileRequest(
  files: FileRequestProps[]
): Promise<Image[]> {
  try {
    const formData = new FormData();
    // Add each file and its information to formData
    files.forEach(({ file, imageId }) => {
      formData.append(`file`, file);
      formData.append(`imageId`, String(imageId));
    });
    // Send the data to the server
    const response = await fetch(`/api/protected/file`, {
      method: "POST",
      body: formData,
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to upload image: ${errorText}`);
    }

    // Convert the response to JSON
    const json: Image[] = await response.json();

    // Return the created image data
    return json;
  } catch (error) {
    throw new Error("Unable to create image");
  }
}

export async function deleteImageRecords(image: ImageType) {
  try {
    if (!image.id) {
      throw new Error("Please provide a valid ID");
    }
    const { id } = image;

    return await prisma.image.delete({
      where: { id },
    });
  } catch (err) {
    throw new Error("Delete Failed: " + err);
  }
}

export async function updatePrismaImages(imageRecords: Image[]) {
  const updatePromises = imageRecords.map((image) =>
    prisma.image.update({
      where: { id: image.id },
      data: { url: image.url },
    })
  );

  return await Promise.all(updatePromises);
}

// Function to handle image integration
/**
 *
 * @param defaultForm
 * @param form
 *
 * update:
 *  - modifica url e dados da imagem que mudou, apontando para o novo url no s3, mantendo ID
 *  - cria registro de imagem para novas imagens de um objeto, levando o File para o backend e realizando upload s3 e create do prisma
 *
 * create:
 *  - cria registros normalmente da mesma forma que o update  --
 *
 * @returns
 */
export const handleImageIntegration = async (defaultForm: any, form: any) => {
  // used to reference one-to-many image
  let image: any = undefined;
  let imagesMap: any[] = [];

  // [['image', ...image[]], ['images', ...images[]]]
  let imageEntries: any[] = Object.entries(form).reduce((acc, [key, value]) => {
    const isId = ["image", "imageId"].includes(key);
    if (isId) {
      const thisImage = form["image"];
      if (defaultForm?.["image"]?.url !== thisImage?.url) {
        image = {
          id: !isNaN(value as any) && value,
          ...(isArray(form["image"]) ? form["image"][0] : form["image"]),
        };
      }
    } else if (key === "images") {
      const defaultMap =
        defaultForm?.[key] && mapById(defaultForm[key] as any[]);
      if (!defaultMap) {
        // @ts-ignore
        acc.push([key, value]);
      } else {
        const changedImages = (value as any[]).filter((item) => {
          return defaultMap[item.id]?.url !== item?.url;
        });

        if (changedImages) {
          imagesMap[key as any] = mapById(changedImages);
          // @ts-ignore
          acc.push([key, changedImages]);
        }
      }
    }
    return acc;
  }, []);

  const files = [];

  // if the model has just 1 image, the function will handle a single s3 integration
  if (image) {
    files.push(await prepareFilesToBackend(image));
  }

  if (imageEntries.some(([, value]) => value?.length)) {
    for (const entry of imageEntries) {
      if (isArray(entry[1])) {
        const preparedFiles = await Promise.all(
          entry[1].map(prepareFilesToBackend)
        );
        files.push(...preparedFiles);
      } else {
        const preparedFile = await prepareFilesToBackend(entry[1] as Image);
        files.push(preparedFile);
      }
    }
  }

  if (files.length) {
    await createFileRequest(files);
  }
  return files;
  /* ['image', [ { id: 154, name: 'name', description: 'desc', url: 'blob:http://localhost:3000/xyz', ... } ... ] ]*/
  /*  let changedEntries: [string, any[]][] = await Promise.all(
    imageEntries.reduce((acc, [key, value], index) => generateOnlyChangedEntries(acc, defaultForm?.[key]?.[index]?.url, value) )
  );

  
  if (!changedEntries.some(([, obj]) => obj?.length)) {
    // none of items have changed
    return { ...defaultForm, ...form };
  }

  // blob to file
  const convertedEntries = await Promise.all(
    await blobUrlToFile(changedEntries)
  );

  

  const id = form?.id;
  
  // backend integration call

  const integratedFiles = await integrateFilesToBackend(
    convertedEntries as any
  );

  
  const newEntries = imageEntries.map(([key, imageArr]) => {
    return [
      key,
      ((isArray(imageArr) ? imageArr : [imageArr]) as any[]).map((image) => {
        return (
          integratedFiles
            .map(([_, value]) => value)
            .find((integratedImage) => {
              return integratedImage?.id === image.id;
            }) || image
        );
      }),
    ];
  });

  

  const result = Object.fromEntries(newEntries);

  return result; */
};

function convertBlobToFile(blob: Blob, name: string): File {
  const file = new File([blob], name);
  return file;
}

async function prepareFilesToBackend(image: Image) {
  const file = convertBlobToFile(await urlToBlob(image.url!), image.name);

  return { file, imageId: image.id };
}

export async function urlToBlob(url: string) {
  return await fetch(url).then((response) => response.blob());
}

function mapById(item: any[]) {
  const map = new Map();
  item.forEach((value) => map.set(value.id, value));

  return Object.fromEntries(map);
}
