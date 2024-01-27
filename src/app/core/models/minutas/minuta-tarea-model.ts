import { MinutaModel } from "./minuta-model";
import { UsuarioModel } from "../usuarios/usuario.model";

export class MinutaTareaModel{
    id: number;
    nombreTarea: string;
    entregable: string;
    fechaTermino: Date;
    usuario: UsuarioModel;
    minuta: MinutaModel;
    createdAt: Date;
    updatedAt: Date;
}