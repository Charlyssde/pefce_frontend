import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ver-video-evento',
  templateUrl: './ver-video-evento.component.html',
  styleUrls: ['./ver-video-evento.component.css']
})
export class VerVideoEventoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VerVideoEventoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

}
