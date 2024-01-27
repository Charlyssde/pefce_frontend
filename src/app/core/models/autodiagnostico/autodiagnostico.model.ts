import { EmpresaModel } from 'src/app/core/models/empresas/empresa.model';
import { UsuarioModel } from "src/app/core/models/usuarios/usuario.model";

export class AutodiagnosticoModel{
  id: number = null;
  //empresa: EmpresaModel = new EmpresaModel();
  //contesto: UsuarioModel = new UsuarioModel();
  
  nombre_comercial: String = null;
  sexo_representante: String = null;
  redes: String = null;
  domicilio_coincide: String = null;
  domicilio_fisico: String = null;
  municipio_fisico: String = null;
  puesto_contesto: String = null;
  operacion: Number = 0;
  esquemas: String = null;
  numero_tiendas: Number = 0;
  representacion: String = null;
  impi: String = null; 
  marca_internacional: String = null;
  certificacion: String = null;
  vucem: String = null;
  volumen: String = null;
  exportacion_previa: String = null;
  actualmente_exporta: String = null;
  pais_exporta: String = null;
  area_ventas: String = null;
  en_linea: String = null;
  programas: String = null;
  estatus: Boolean = null;
  created_at: Date = null;
  updated_at: Date = null;
}
