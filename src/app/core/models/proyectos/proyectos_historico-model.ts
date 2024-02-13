import { MeetingsModel } from "../meetings/meetings-model";
import { UsuarioModel } from "../usuarios/usuario.model";

export class ProyectosHistoricoModel{
  id: number = null;
  usuarioId: UsuarioModel = null;
  accion: string = null;
  tipoId: string = null;
  createdAt: Date = null;
  updatedAt: Date = null;
  meetings: MeetingsModel[] = [];
  file : Boolean = false;
}
