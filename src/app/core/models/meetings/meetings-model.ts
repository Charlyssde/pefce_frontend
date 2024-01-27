import { ZoomMeetingModel } from './zoom_meeting-model';
import { MeetingCuentasModel } from './meeting_cuentas-model';
export class MeetingsModel{
  id: number = null;
  meetingCuentaId: MeetingCuentasModel = null;
  apiResponse: ZoomMeetingModel = null;
  activo: boolean = true;
  createdAt: Date = null;
  updatedAt: Date = null;
  meetingZoom: ZoomMeetingModel = null;
}
