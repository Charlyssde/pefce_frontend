import { ProfileModel } from "src/app/core/models/profiles/profiles.model";
import { UsuarioModel } from "src/app/core/models/usuarios/usuario.model";

export class UserRequest{
    user: UsuarioModel;
    updatePassword: boolean;
    newPassword: string;
    repeatPassword: string;
    profiles: ProfileModel[];
}