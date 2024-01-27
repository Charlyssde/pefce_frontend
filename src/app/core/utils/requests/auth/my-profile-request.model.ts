import { UsuarioModel } from "src/app/core/models/usuarios/usuario.model";

export class MyProfileRequest{
    usuario: UsuarioModel;
    actualizarPassword: boolean;
    nuevaPassword: string;
    repetirPassword: string;
}