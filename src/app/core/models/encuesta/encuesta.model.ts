import { FileModel } from "../files/file.model";

export class EncuestaModel{
    id: number;
    titulo: string;
    descripcion: string;
    archivo: FileModel[];
}