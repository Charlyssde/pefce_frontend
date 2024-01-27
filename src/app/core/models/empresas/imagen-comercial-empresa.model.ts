import { FileModel } from "../files/file.model";

export class ImagenComercialEmpresaModel{
    id: number;
    slogan: string = null;
    banner1:string = null;
    banner2:string = null;
    logotipoId:FileModel = null;
    videoId:FileModel = null;
    estatus: boolean = true;
    createdAt: Date;
    updatedAt: Date;
}