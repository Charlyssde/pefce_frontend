import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { DirectorioEmpresarialModel } from 'src/app/core/models/directorio-empresarial/directorio-empresarial.model';
import { EventoModel } from 'src/app/core/models/eventos/eventos-model';
export class SolicitudesAsistenciaEventoModel{
  id: number = null;
  eventoId: EventoModel = null;
  directorioEmpresarialId: DirectorioEmpresarialModel = null;
  usuarioContactoId: UsuarioModel = null;
  tipoParticipacion: string = null;
  createdAt: Date = null;
  updatedAt: Date = null;
}
