import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '@env/environment';

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.css']
})
export class VideoPreviewComponent implements OnInit {

  video: string;
  
  constructor(
    public dialogRef: MatDialogRef<VideoPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { 
    this.video = (data.video.includes('base64') ? data.video : this.setURI(data.video));
  }

  setURI(pathfile: string) : string{
    let now: string = new Date().toISOString();
    return environment.apiUrl+"/files/getUrl?pathfile="+pathfile+"&"+now;
  }

  ngOnInit() {
  }

}
