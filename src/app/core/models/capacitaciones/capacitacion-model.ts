import { EncuestaModel } from "src/app/core/models/encuesta/encuesta.model";

export class CapacitacionModel {
  id: number;
  nombre: string;
  descripcion: string;
  imagenPerfil: string;
  portada: string;
  subarea: string;
  fechaInicio: Date;
  fechaFin: Date;
  activo: boolean;
  tipo: number;
  link: String;
  lugar: String;
  createdAt: Date;
  updatedAt: Date;
  encuesta: EncuestaModel;
}
