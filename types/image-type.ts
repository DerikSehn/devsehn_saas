import { Image } from '@prisma/client';

export interface ImageType
  extends Omit<
    Image,
    | 'createdAt'
    | 'updatedAt'
    | 'projectId'
    | 'userId'
    | 'sectionId'
    | 'id'
    | 'postId'
  > {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  projectId?: number | null;
  postId?: number | null;
  userId?: string | null;
  sectionId?: number | null;
}
