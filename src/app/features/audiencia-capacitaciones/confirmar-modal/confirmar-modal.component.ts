import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';

export interface DialogData {
  id: number,
  etiqueta: string,
  nombre: string,
  isRechazar: boolean,
  isVerMotivo: boolean,
  motivoRechazo: string
}

@Component({
  selector: 'app-confirmar-modal',
  templateUrl: './confirmar-modal.component.html',
  styleUrls: ['./confirmar-modal.component.css']
})
export class ConfirmarModalComponent implements OnInit {

  formulario: FormGroup;
  isRechazar = false;
  isVerMotivo = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<ConfirmarModalComponent>,
    private fb: FormBuilder,
    private scriptGL: ScriptsGlobalService
  ) { }

  ngOnInit(){
    this.isRechazar = this.data.isRechazar;
    this.isVerMotivo = this.data.isVerMotivo;
    this.formulario = this.fb.group({
      motivoRechazo: ['']
    });
    if(this.isVerMotivo){
      this.formulario.controls['motivoRechazo'].setValue(this.data.motivoRechazo);
      this.formulario.controls['motivoRechazo'].disable();
    }
  }

  confirm() {
    const motivoRechazo = this.formulario.controls['motivoRechazo'].value;
    if(!this.data.isRechazar){
      this.dialogRef.close({ motivo: motivoRechazo});
    } else if(this.data.isRechazar && motivoRechazo != '' && motivoRechazo.length > 25){
      this.dialogRef.close({ motivo: motivoRechazo});
    } else {
      this.scriptGL.printSnackbar(15, null, null, 'Favor de ingresar el motivo de rechazo mayor a 25 caracteres', 5, false, null, null);
    }
  }

}
