import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { DirectorioEmpresarialModel } from 'src/app/core/models/directorio-empresarial/directorio-empresarial.model';
export class SolicitudesVinculacionModel{
  id: number = null;
  tipoVinculacion: number = null;
  directorioEmpresarialId: DirectorioEmpresarialModel = null;
  contactoEmpresaId:UsuarioModel = null;
  createdAt: Date = null;
  updatedAt: Date = null;
}
