import { CatalogoModel } from "src/app/core/models/catalogos/catalogo-model";

export class ContactoModel {
  id: number;
  idioma: CatalogoModel;
  fuente: CatalogoModel;
  nombre: string;
  sexo: string;
  titulo: string;
  puesto: string;
  departamento: string;
  correo: string;
  correoAlternativo: string;
  recibirCorreos: boolean;
  telefono: number;
  extension: number;
  telefonoAlterno: number;
  direccion: string;
  estatus: string;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
}
