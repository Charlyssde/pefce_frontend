import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ver-info-evento',
  templateUrl: './ver-info-evento.component.html',
  styleUrls: ['./ver-info-evento.component.css']
})
export class VerInfoEventoComponent implements OnInit {

  constructor(
    public lib: ScriptsGlobalService,
    public dialogRef: MatDialogRef<VerInfoEventoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

}
