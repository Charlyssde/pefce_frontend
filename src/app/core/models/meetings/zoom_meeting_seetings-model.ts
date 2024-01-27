export class ZoomMeetingSettingsModel{
  allow_multiple_devices: boolean = true;
  approval_type: number = 2;
  auto_recording: string; // local, cloud, none 'enum'
  jbh_time: number = 10;
  join_before_host: boolean = true;
  mute_upon_entry: boolean = true;
  participant_video: boolean = false;
  registration_type: number; // If meeting type = 8 can : 1 - register once; 2: register each, 3: register optional
  waiting_room: boolean = false;
}
