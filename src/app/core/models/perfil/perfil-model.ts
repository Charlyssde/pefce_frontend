import { UsuarioModel } from "src/app/core/models/usuarios/usuario.model";

export class PerfilModel{
    id: number;
    creador: UsuarioModel;
    padre: PerfilModel;
    nombre: string;
    tipo: number;
    createdAt: Date;
    updatedAt: Date;
}