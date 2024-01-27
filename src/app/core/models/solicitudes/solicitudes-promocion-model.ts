import { AnyMxRecord } from "dns";

export class SolicitudesPromocionModel{
  id: number = null;
  ubicacion: string = null;
  coordenadas: any = {"lat":0,"lng":0};
  superficie: number = null;
  unidadSuperficie: string = null;
  tipologia: string = null;
  valorM2: number = null;
  vocacion: string = null;
  permisos: string = null;
  tipoPropiedad: any = {"Escritura pública":false,"Título de propiedad":false,"Vocación":false,"Cesión de derechos":false,"Certificado parcelario":false,"Puerto":false,"Otro":false};
  datosDocumento: string = null;
  tieneGravamen: boolean = null;
  createdAt: Date = null;
  updatedAt: Date = null;
}
