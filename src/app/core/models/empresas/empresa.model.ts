import { CatalogoModel } from "src/app/core/models/catalogos/catalogo-model";
import { DomicilioModel } from "../shared/domicilio.model";
import { UsuarioModel } from "../usuarios/usuario.model";
import { ImagenComercialEmpresaModel } from "./imagen-comercial-empresa.model";
import { ProductoModel } from "./producto.model";
import { AutodiagnosticoModel } from "../autodiagnostico/autodiagnostico.model";

export class EmpresaModel{
    id: number;
    empresa: string;
    rfc: string;
    regimenFiscal: CatalogoModel;
    categoria: CatalogoModel;
    sector: CatalogoModel = new CatalogoModel();
    subsector: CatalogoModel = new CatalogoModel();
    telefono: string;
    email: string;
    website: string;
    descripcion: string;
    representanteLegal: string;
    numeroColaboradoresMasculinos: number;
    numeroColaboradoresFemeninos: number;
    numeroColaboradoresCapacidadesDiferentes: number;
    totalColaboradores: number;
    pabellonAprobado:boolean;
    estatus: boolean = true;
    createdAt: Date;
    updatedAt: Date;
    contactos: UsuarioModel[];
    domicilios: DomicilioModel[];
    imagenEmpresarial: ImagenComercialEmpresaModel[];
    productos: ProductoModel[];
    solicitudesAcceso: any[];
    autodiagnostico: AutodiagnosticoModel;
    autorizado: boolean = null;
}
