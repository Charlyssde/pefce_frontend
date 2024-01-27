export class SesionModel {
    idSesion: number;
    idUsuario: number;
    nombreUsuario: string;
    roles: Array <{
      id: number;
      nombreRol: string;
      urlModulo: string,
      icon: string;
      nombreEtiqueta: string;
      canCreate: boolean;
      canUpdate: boolean;
      canDelete: boolean;
      canShow: boolean;
      canReport: boolean;
      subModulos: any;
    }>;
    perfil: any;
  }
  