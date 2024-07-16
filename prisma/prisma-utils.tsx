import { Image } from "@prisma/client";

export type ModelWithImage<T> = T & { image: Image }
export type ModelWithImages<T> = T & { images: Image[] }
