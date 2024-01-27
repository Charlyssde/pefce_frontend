import { ZoomMeetingRecurrence } from "./zoom_meeting_recurrence-model";
import { ZoomMeetingSettingsModel } from "./zoom_meeting_seetings-model";

export class ZoomMeetingModel{
  agenda:string = null;
  type: number = null;
  default_password:boolean = false;
  duration: number = 60;
  password: string = this.makeRandoPassword();
  pre_schedule: boolean = false;
  recurrence: ZoomMeetingRecurrence = new ZoomMeetingRecurrence();
  schedule_for: string = "sedecop.zoom@gmail.com";
  settings: ZoomMeetingSettingsModel = new ZoomMeetingSettingsModel();
  //start_time: Date = null;
  start_time: string = null;
  timezone: string = "America/Mexico_City";
  topic: string = null;
  tracking_fields: any = null;


  makeRandoPassword() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 10; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
}
