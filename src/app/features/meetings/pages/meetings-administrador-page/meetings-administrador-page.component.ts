import { MeetingsService } from './../../services/meetings.service';
import { MeetingCuentasModel } from './../../../../core/models/meetings/meeting_cuentas-model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';

@Component({
  selector: 'app-meetings-administrador-page',
  templateUrl: './meetings-administrador-page.component.html',
  styleUrls: ['./meetings-administrador-page.component.css']
})
export class MeetingsAdministradorPageComponent implements OnInit {

  displayedColumns: string[] = ["nombre","area","activo","testCuenta","acciones"];
  dataSource = null;
  isCharge = false;

  cuentasList: MeetingCuentasModel[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private meetingsService: MeetingsService,
    public lib: ScriptsGlobalService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCuentas();
  }

  async getCuentas(){
    await this.meetingsService.getCuentas().subscribe((cuentas) => {
      if (cuentas.length > 0) {
        this.dataSource = new MatTableDataSource(cuentas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isCharge = true;
      } else {
        this.dataSource = null;
        this.isCharge = true;
        this.lib.printSnackbar(2, 1, 'cuentas de meetings', null, 5, false, null, null);
      }
    }, error => {
      this.lib.printErrorSnackBar(error);
      this.isCharge = true;
    });
  }

  setMatDataSource(data: any){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  verifyAccountCredentials(cuenta: MeetingCuentasModel){
    let meetingAccountCredentialRequest = {
      zoomAccountId: cuenta.zoomAccountId,
      zoomClientId: cuenta.zoomClientId,
      zoomClientSecret: cuenta.zoomClientSecret
    };
    this.meetingsService.getAuthTokenReference(meetingAccountCredentialRequest).subscribe(response => {
      if(response){
        this.lib.printSnackbar(15,null,null,"Cuenta verificada exitosamente",7,false,null,null);
      }
    },error => {
      this.lib.printSnackbar(15,null,null,"Revisa la información ingresada ya que no fue posible verificar lac cuenta de Zoom",7,false,null,null);
    });
  }
}
