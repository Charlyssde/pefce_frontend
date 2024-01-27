import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface SiteContentVideoData{
  module: string,
  url: string
}

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.css']
})
export class VideoModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VideoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SiteContentVideoData) {}

  ngOnInit(){}

  closeModal(): void {
    this.dialogRef.close();
  }

}
