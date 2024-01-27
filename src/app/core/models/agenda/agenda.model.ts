import { TareasModel } from "../tareas/tareas-model";
import { UsuarioModel } from "../usuarios/usuario.model";

export class AgendaModel{
    id: number;
    titulo: string;
    descripcion: string;
    inicio: Date;
    fin: Date;
    diaCompleto: boolean;
    estatus: boolean;
    tipoEvento: string;
    createdAt: Date;
    updatedAt: Date;
    usuariosAgenda: UsuarioModel[];
    tareasAgenda: TareasModel[];
}