import { EventosService } from 'src/app/features/eventos/service/eventos.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';

@Component({
  selector: 'app-registro-evento',
  templateUrl: './registro-evento.component.html',
  styleUrls: ['./registro-evento.component.css']
})
export class RegistroEventoComponent implements OnInit {

  constructor(
    public lib: ScriptsGlobalService,
    public evServ: EventosService,
    public dialogRef: MatDialogRef<RegistroEventoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  async saveEventoEmpresa(usuarioEmpresa, evento) {

    let
      eventoEmpresaModel = {
        id: null,
        evento: evento,
        directorio: null,//usuarioEmpresa.empresa,
        activo: true,
        createdAt: new Date(),
        updatedAt: null,
        estatus: "En espera"
      };

    await this.evServ.createEventoDirectorio(eventoEmpresaModel).subscribe((resp) => {
      if (resp) {
        this.lib.printSnackbar(15, null, null, 'Su registro al evento ' + evento.nombreEvento + ' se realizó con éxito', 5, false, null, null);
      }
      else {
        this.lib.printSnackbar(15, null, null, 'Ocurrió un problema al intentar crear el registro al evento', 5, false, null, null);
      }
    }, (error) => {
      this.lib.printSnackbar(15, null, null, 'Error de servidor', 5, false, null, null);
    });

    this.closeModal();
  }

  closeModal(): void {
    this.dialogRef.close();
  }

}
