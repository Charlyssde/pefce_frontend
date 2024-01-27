import { PabellonesModel } from './pabellones-model';
export class PabellonesProductosModel{
  id: number;
  pabellones: PabellonesModel;
  pathfileDocumento: any;
  pathfileImagen: any;
  producto: string;
  estatus: boolean;
  createdAt: Date;
  updatedAt: Date;
}
