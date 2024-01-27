import { ModuloModel } from "./modulo-model";
import { PreguntaModel } from "src/app/core/models/capacitaciones/pregunta-model";

export class TemaModel{
    id: number;
    nombre: string;
    descripcion: string;
    tipoRecurso: string;
    recurso: string;
    modulo: ModuloModel;
    preguntas: Array<PreguntaModel>;
    createdAt: Date;
    updatedAt: Date;
}