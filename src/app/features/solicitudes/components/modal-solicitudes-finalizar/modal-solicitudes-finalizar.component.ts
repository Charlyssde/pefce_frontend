import { SolicitudesModel } from 'src/app/core/models/solicitudes/solicitudes-model';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { SolicitudesService } from '../../services/solicitudes.service';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-modal-solicitudes-finalizar',
  templateUrl: './modal-solicitudes-finalizar.component.html',
  styleUrls: ['./modal-solicitudes-finalizar.component.css']
})
export class ModalSolicitudesFinalizarComponent implements OnInit {

  userSession = null;
  comentario = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalSolicitudesFinalizarComponent>,
    public lib: ScriptsGlobalService,
    public solicitudesService: SolicitudesService,
    private elRef: ElementRef
  ) {
    this.userSession = this.lib.getUserSessionData();
  }

  ngOnInit() {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  async save(){
    let
      solicitud: SolicitudesModel = this.data.solicitud,      
      today = new Date();

    solicitud.estatus = true;
    solicitud.updatedAt = today;
    solicitud.comentario = this.elRef.nativeElement.querySelector('#comentario').value;
    if( this.data.cancelar ){
      solicitud.comentario = "Cancelada por el usuario";
    }
    this.solicitudesService.updateSolicitud(solicitud).subscribe((response) => {
      this.lib.printSnackbar(15,null,null,"La solicitud se ha finalizado con éxito",5,false,null,null);
      this.closeModal();
    });
  }
}
