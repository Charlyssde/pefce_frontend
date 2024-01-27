import { CatalogoModel } from "../catalogos/catalogo-model";
//import { MunicipiosModel } from "./municipios-model";

export class CodigoPostalModel {
  id: number;
  idEstado: CatalogoModel;
  estado: string;
  idMunicipio: CatalogoModel;
  municipio: string;
  ciudad: string;
  cp: string;
  asentamiento: string;
  tipo: string;
}
