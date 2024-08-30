import { Image } from "@prisma/client";

export interface ImageType
  extends Omit<
    Image,
    "createdAt" | "updatedAt" | "projectId" | "userId" | "sectionId" | "id"
  > {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  projectId?: number | null;
  userId?: string | null;
  sectionId?: number | null;
}
