import { Post, BlogCategory, Image, User } from '@prisma/client';

export interface PostType extends Post {
  categories: BlogCategory[];
  images: Image[];
  user?: User;
}
