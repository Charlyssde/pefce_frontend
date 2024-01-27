import { CatalogoModel } from '../catalogos/catalogo-model';
import { DirectorioEmpresarialModel } from '../directorio-empresarial/directorio-empresarial.model';
import { EmpresaModel } from '../empresas/empresa.model';
import { TareasModel } from '../tareas/tareas-model';
import { ProyectosColaboradorModel } from './proyectos_colaborador-model';
import { ProyectosHistoricoModel } from './proyectos_historico-model';

export class ProyectosModel {
  id: number = null;
  tipoId: CatalogoModel = null;
  folio:string = null;
  empresaId: DirectorioEmpresarialModel = null;
  nombre: string = null;
  descripcion: string = null;
  prioridad: string = null;
  fechaInicio: Date = null;
  fechaFin: Date = null;
  area: string = null;
  montoPrevisto: number = null;
  empleosDirectos: number = null;
  empleosIndirectos:number = null;
  oficioTurno: string = null;
  observaciones: string = null;
  estatus: CatalogoModel = null;
  activo: boolean = null;
  createdAt: Date = null;
  updatedAt: Date = null;
  historico: ProyectosHistoricoModel[] = null;
  proyectoTareas: TareasModel[] = null;
  colaboradores: ProyectosColaboradorModel[] = null;
}
