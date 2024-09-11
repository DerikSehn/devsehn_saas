
import { File } from 'formidable';
import { promises as fs } from 'fs';


export async function persistentFileToBuffer(file: File): Promise<Buffer> {
  try {
    const buffer = await fs.readFile(file.filepath);
    return buffer;
  } catch (error: any) {
    throw new Error(`Erro ao ler o arquivo: ${error.message}`);
  }
}