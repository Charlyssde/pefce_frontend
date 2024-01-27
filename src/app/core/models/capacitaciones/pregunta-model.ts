import { TemaModel } from "src/app/core/models/capacitaciones/tema-model";

export class PreguntaModel{
    id: number;
    nombre: string;
    pregunta: string;
    detalle: string;
    recurso: string;
    respuestaA: string;
    respuestaB: string;
    respuestaC: string;
    respuestaD: string;
    respuestaCorrecta: string;
    tema: TemaModel;
    createdAt: Date;
    updatedAt: Date;
}