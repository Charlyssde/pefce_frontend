import { UsuarioModel } from "../usuarios/usuario.model";

export class ProyectosColaboradorModel{
  id: number = null;
  usuarioId: UsuarioModel = null;
  rol: string = null;
  createdAt: Date = null;
  updatedAt: Date = null;
  activo: Boolean = null;
}
