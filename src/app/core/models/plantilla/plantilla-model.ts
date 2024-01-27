import { UsuarioModel } from "src/app/core/models/usuarios/usuario.model";

export class PlantillaModel {
    id: number;
    nombre: string;
    createdAt: Date;
    updatedAt: Date;
    usuarioId: UsuarioModel;
    tareas: PlantillaTareasModel[];
}

export class PlantillaTareasModel {
    id: number;
    plantilla_id: number;
    descripcion: string;
    entregable: string;
    dias: string;
}