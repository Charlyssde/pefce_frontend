import { ProfileModel } from "../profiles/profiles.model";
import { DomicilioModel } from "../shared/domicilio.model";

export class UsuarioModel{
    id: number;
    nombre: string;
    email: string;
    password: string;
    telefono: string;
    sexo: string;
    recibirPublicidad: boolean;
    estatus: boolean;
    createdAt: Date;
    updatedAt: Date;
    domicilios: DomicilioModel[];
    perfiles: ProfileModel[];
}