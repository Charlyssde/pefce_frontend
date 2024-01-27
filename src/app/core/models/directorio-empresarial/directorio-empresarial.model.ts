//import { EstadosModel } from './estados-model';

import { CatalogoModel } from "../catalogos/catalogo-model";

//import { MunicipiosModel } from './municipios-model';
export class DirectorioEmpresarialModel{
  id: number;
  razonSocial: string;
  tipoEmpresa: any;
  sectorPrincipal: any;
  subSector: any;
  parqueIndustrial: any;
  nombreLegal: string;
  nombreComercial: string;
  giroComercial: string;
  grupo: string;
  regimen: any;
  rfc: string;
  curp: string;
  descripcion: string;
  telefono: number;
  paginaWeb: string;
  colabMasculinos: number;
  colabFemeninos: number;
  colabCapacDifer: number;
  totalEmpleados: number;
  enBolsaValores: boolean;
  esMaquiladora: boolean;
  montoAnual: number;
  montoExportacion: number;
  representanteLegal: string;
  correo: string;
  comentarios: string;
  pais: any;
  estado: CatalogoModel;
  municipio: CatalogoModel;
  colonia: string;
  calle: string;
  codigoPostal: number;
  estatus: string;
  motivoRechazo: string;
  logotipo: string;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}
