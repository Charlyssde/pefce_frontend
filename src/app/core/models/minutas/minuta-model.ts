import { CatalogoModel } from "src/app/core/models/catalogos/catalogo-model";
/* import { EstadosModel } from "../estados-model";
import { MunicipiosModel } from "../municipios-model";
 */import { ProyectosModel } from 'src/app/core/models/proyectos/proyectos-model';

export class MinutaModel {
    id: number = null;
    folio: string = null;
    asunto: string = null;
    objetivo: string = null;
    sede: string = null;
    fecha: Date = null;
    comentarios: String = null;
    puntosTratados: String = null;
    codigoPostal: String = null;
    ciudad: String = null;
    idClase: number = null;
    createdAt: Date = null;
    updatedAt: Date = null;


    tipoMinuta: CatalogoModel = null;
    claseMinuta: CatalogoModel = null;
    estado: CatalogoModel = null;
    municipio: CatalogoModel = null;

    minutaTareas: Array<any> = null;
    minutaTemas: Array<any> = null;
    minutaUsuarios: Array<any> = null;
    proyecto: ProyectosModel = null;
}
