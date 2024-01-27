import { CanalModel } from "src/app/core/models/canal/canal-model";
import { UsuarioModel } from "src/app/core/models/usuarios/usuario.model";

export class NotificacionModel {
    id: number;
    destinatario: UsuarioModel;
    canal: CanalModel;
    texto: String;
    tipo: number;
    vista: false;
    leida: Date;
    createdAt: Date;
    updatedAt: Date;
}