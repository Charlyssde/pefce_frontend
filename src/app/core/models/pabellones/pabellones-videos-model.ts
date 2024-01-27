import { PabellonesModel } from "./pabellones-model";

export class PabellonesVideosModel{
  id: number;
  pabellones: PabellonesModel;
  pathfile: any;
  titulo: string;
  estatus: boolean;
  createdAt: Date;
  updatedAt: Date;
}
