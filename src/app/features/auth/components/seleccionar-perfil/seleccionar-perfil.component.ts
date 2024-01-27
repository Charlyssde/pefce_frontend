import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface SelectPerfilInterface {
  perfiles: Array<any>;
  selectedPerfil: any
}

@Component({
  selector: 'app-seleccionar-perfil',
  templateUrl: './seleccionar-perfil.component.html',
  styleUrls: ['./seleccionar-perfil.component.css']
})

export class SeleccionarPerfilComponent implements OnInit {
  selectedPerfil: any;

  constructor(
    public dialogRef: MatDialogRef<SeleccionarPerfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectPerfilInterface,
  ) { }

  ngOnInit() {
  }
}
