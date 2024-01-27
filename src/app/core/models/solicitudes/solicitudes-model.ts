import { UsuarioModel } from "../usuarios/usuario.model";

export class SolicitudesModel{
  id: number = null;
  folio: string = null;
  tipoSolicitudId: number = null;
  usuarioSolicitanteId: UsuarioModel = null;
  usuarioEncargadoId: UsuarioModel = null;
  descripcion: string = null;
  estatus: boolean = null;
  comentario: string = null;
  createdAt: Date = null;
  updatedAt: Date = null;
}
