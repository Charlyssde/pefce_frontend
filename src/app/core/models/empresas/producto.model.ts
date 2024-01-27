import { FileModel } from "../files/file.model";

export class ProductoModel{
    id: number;
    nombre: string;
    descripcion: string;
    empaqueEnvasado: string;
    embalaje: string;
    estibado: string;
    condicionesAlmacenamiento: string;
    transporte: string;
    vidaAnaquel: string;
    lugarOrigen: string;
    estatus: boolean;
    createdAt: Date;
    updatedAt: Date;
    fichaTecnica: FileModel[];
    imagenes: FileModel[];
    videos: FileModel[];
}