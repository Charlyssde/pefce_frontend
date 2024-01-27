import { CatalogoModel } from '../catalogos/catalogo-model';

export class MeetingCuentasModel{
  id: number = null;
  areasId: CatalogoModel = null;
  name: string = null;
  zoomUserId: string = null;
  zoomUserPwd: string = null;
  zoomAccountId: string = null;
  zoomClientId: string = null;
  zoomClientSecret: string = null;
  zoomSecretTokenFeatures: string = null;
  zoomSecretVerificationFeatures: string = null;
  activo: boolean = true;
  createdAt: Date = null;
  updatedAt: Date = null;
}
