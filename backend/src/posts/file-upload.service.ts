import { Injectable } from '@nestjs/common';
import { extname, join } from 'path';
import * as fs from 'fs';
import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);

@Injectable()
export class FileUploadService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${Date.now()}${extname(file.originalname)}`;
    const filePath = join(process.cwd(), 'uploads', fileName);

    // Asegúrate de que el directorio 'uploads' exista
    if (!fs.existsSync(join(process.cwd(), 'uploads'))) {
      fs.mkdirSync(join(process.cwd(), 'uploads'));
    }

    // Guarda el archivo
    await writeFileAsync(filePath, file.buffer);

    // Devuelve la ruta relativa del archivo
    return `uploads/${fileName}`;
  }
}