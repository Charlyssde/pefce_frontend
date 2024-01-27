import { ProyectosModel } from 'src/app/core/models/proyectos/proyectos-model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrls: ['./show-project.component.css']
})
export class ShowProjectComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ShowProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

}
