import { SolicitudesHistoricoModel } from './../../../../core/models/solicitudes/solicitudes-historico-model';
import { SolicitudesModel } from './../../../../core/models/solicitudes/solicitudes-model';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatPaginator, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { SolicitudesService } from '../../services/solicitudes.service';

@Component({
  selector: 'app-modal-solicitudes-historico',
  templateUrl: './modal-solicitudes-historico.component.html',
  styleUrls: ['./modal-solicitudes-historico.component.css']
})
export class ModalSolicitudesHistoricoComponent implements OnInit {

  displayedColumns: string[] = ['accion','usuarioId','createdAt'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = null;
  isCharge = false;
  userSession = null;
  history: SolicitudesHistoricoModel = new SolicitudesHistoricoModel();
  solicitud: SolicitudesModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalSolicitudesHistoricoComponent>,
    public lib: ScriptsGlobalService,
    public solicitudesService: SolicitudesService
  ) {
    this.prepareData(this.data.solicitud);
    this.solicitud = this.data.solicitud;
    this.userSession = this.lib.getUserSessionData();
    this.history.usuarioId = data.solicitud.usuarioEncargadoId;
  }

  ngOnInit() {
  }

  prepareData(solicitud: SolicitudesModel){
    //this.dataSource = new MatTableDataSource(solicitud.historico);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  validateHistory():boolean{
    let valid = false;

    if(this.history.accion !== null){
      if(this.history.usuarioId !== null){
        valid = true;
      }
    }

    return valid;
  }

  async save(){
    if(this.validateHistory()){
      this.history.createdAt = new Date();
      //this.solicitud.historico.push(this.history);

      this.solicitudesService.updateSolicitud(this.solicitud).subscribe((response)=>{
        if(response){
          this.lib.printSnackbar(15,null,null,"El registro de histórico se realizó con éxito",5,false,null,null);
          this.closeModal();
        }
      });
    }
    else{
      this.lib.printSnackbar(15,null,null,"Debes agregar una acción para guardar el historial",5,false,null,null);
    }
  }
}
