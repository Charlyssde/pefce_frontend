import { CapacitacionModel } from "src/app/core/models/capacitaciones/capacitacion-model";
import { TemaModel } from "./tema-model";

export class ModuloModel {
    id: number;
    nombre: string;
    descripcion: string;
    capacitacion: CapacitacionModel;
    temas: Array<TemaModel>;
    createdAt: Date;
    updatedAt: Date;
}