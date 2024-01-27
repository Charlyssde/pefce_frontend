import { EmpresaModel } from "src/app/core/models/empresas/empresa.model";
import { UsuarioModel } from "src/app/core/models/usuarios/usuario.model";

export class UsuarioEmpresaModel {
  id: number;
  usuario: UsuarioModel;
  empresa: EmpresaModel;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}
