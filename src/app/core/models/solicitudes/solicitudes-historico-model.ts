import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
export class SolicitudesHistoricoModel{
  id: number = null;
  usuarioId: UsuarioModel = null;
  accion: string = null;
  createdAt: Date = null;
}
