import { UsuarioModel } from "../usuarios/usuario.model";

export class ProfileModel{
    id:number;
    nombre:String;
    tipo:String;
    area:string;
    perfilId:number;
    nivel:number;
    estatus: boolean;
    createdAt:Date;
    updatedAt:Date;
    perfiles:ProfileModel[];
    permisos:any;
}