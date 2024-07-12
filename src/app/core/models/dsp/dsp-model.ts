import { FileModel } from "../files/file.model";

export interface DspModel {
    id: number;
    solicitudSefiplan : Date
    numeroDSP : string
    autorizacion : Date
    recepcion : Date
    importe : number
    descripcion : string
    concepto : string
    codigoPresupuestal : string
    vigencia : Date
    solicitud : Date
    solicitudProrroga : Date
    oficioProrroga : string
    autorizacionProrroga : Date
    recepcionProrroga : Date
    file : FileModel    
  }
  