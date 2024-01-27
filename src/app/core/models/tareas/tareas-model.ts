import { UsuarioModel } from "../usuarios/usuario.model";

export class TareasModel{
  id: number = null;
  usuarioId: UsuarioModel = null;
  tarea: string = null;
  descripcion: string = null;
  entregable: string = null;
  fechaInicio: Date = null;
  fechaTermino: Date = null;
  estatus: Boolean = null;
  createdAt: Date = null;
  updatedAt: Date = null;
}
