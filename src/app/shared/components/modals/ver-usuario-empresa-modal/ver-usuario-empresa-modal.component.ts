import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from 'src/app/features/users/services/users.service';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
//import { DirectorioEmpresarialModel } from '../../models/directorio-empresarial.model';

export interface DialogData {
  //directorio: DirectorioEmpresarialModel
}

@Component({
  selector: 'app-ver-usuario-empresa-modal',
  templateUrl: './ver-usuario-empresa-modal.component.html',
  styleUrls: ['./ver-usuario-empresa-modal.component.css']
})

export class VerUsuarioEmpresaModalComponent implements OnInit {

  idEmpresa = 0;
  isPage = false;
  displayedColumns: string[] = ['nombreCompleto', 'puesto', 'correo', 'telefono', 'fuenteContacto'];
  dataSource = null;
  isCharge = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private usuarioService: UsersService,
    private scriptGL: ScriptsGlobalService
  ) { }

  ngOnInit() {
    //this.idEmpresa = this.data.directorio.id;
    this.isPage = true;
    this.getPage();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getPage() {
    await this.usuarioService.pageByIdDependencia(this.idEmpresa).subscribe(data => {
      if (data.length > 0) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isCharge = true;
      } else {
        this.dataSource = null;
        this.isCharge = true;
        this.scriptGL.printSnackbar(2, 1, 'usuarios', null, 5, false, null, null);
      }
    }, error => {
      this.scriptGL.printErrorSnackBar(error);
      this.isCharge = true;
    });
  }

}
