import { Image } from "@prisma/client";


export type RawFileProps = {
    file: File;
    image: Image;
}[];


export interface FileRequestProps {
    file: File,
    imageId: number
}