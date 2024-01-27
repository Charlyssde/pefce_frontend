import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MinutaModel } from 'src/app/core/models/minutas/minuta-model';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';

export interface DialogData {
  id: number,
  nombreTarea: string,
  entregable: string,
  fechaTermino: Date,
  usuario: UsuarioModel,
  minuta: MinutaModel,
  createdAt: Date,
  updatedAt: Date,
  participantes: Array<any>
}

@Component({
  selector: 'app-minuta-tarea-modal',
  templateUrl: './minuta-tarea-modal.component.html',
  styleUrls: ['./minuta-tarea-modal.component.css']
})
export class MinutaTareaModalComponent {

  constructor(
    public dialogRef: MatDialogRef<MinutaTareaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
