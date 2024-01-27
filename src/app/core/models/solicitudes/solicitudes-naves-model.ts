export class SolicitudesNavesModel{
  id: number = null;
  terreno:number = null;
  ubicacionSolicitada: string = null;
  agua: number = null;
  densidadPoblacional: number = null;
  caracteristicas: any = {"gas":false,"electricidad":false,"vocacion":false,"drenaje":false,"carretera":false,"puerto":false,"via_ferrea":false};
  otrosRequerimientos: string = null;
  createdAt: Date = null;
  updatedAt: Date = null;
}
