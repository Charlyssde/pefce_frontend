import { PabellonesVideosModel } from 'src/app/core/models/pabellones/pabellones-videos-model';
import { PabellonesProductosModel } from 'src/app/core/models/pabellones/pabellones-productos-model';
import { DirectorioEmpresarialModel } from 'src/app/core/models/directorio-empresarial/directorio-empresarial.model';
export class PabellonesModel{
  id:number = null;
  idDirectorioEmpresarial:DirectorioEmpresarialModel = null;
  logotipo:string = null;
  slogan: string = null;
  banner1: string = null;
  banner2: string = null;
  estatus:boolean = null;
  createdAt: Date = null;
  updatedAt: Date = null;
  productos: PabellonesProductosModel[];
  videos: PabellonesVideosModel[];
}
