import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { EliminarModalComponent } from 'src/app/shared/components/modals/eliminar-modal/eliminar-modal.component';
import { PlantillasService } from '../service/plantillas.service';

@Component({
  selector: 'app-page-plantilla',
  templateUrl: './page-plantilla.component.html',
  styleUrls: ['./page-plantilla.component.css']
})
export class PagePlantillaComponent implements OnInit {

  displayedColumns: string[] = [
    'nombre',
  ]; 
  dataSource = null;
  isCharge = false;
  
  @Output() goUpdate: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private router: Router,
    private service: PlantillasService,
    public scriptGL: ScriptsGlobalService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
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
    await this.service.pageByUsuarioId(this.scriptGL.getUserSessionData().idUsuario).subscribe(data => {
      if (data.length > 0) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isCharge = true;
      } else {
        this.dataSource = null;
        this.isCharge = true;
        this.scriptGL.printSnackbar(2, 1, 'plantilla', null, 5, false, null, null);
      }
    }, error => {
      this.scriptGL.printErrorSnackBar(error);
      this.isCharge = true;
    });
  }

  editar(data) {
    this.goUpdate.emit(data);
  }

  async eliminar(data) {
    const dialogRef = this.dialog.open(EliminarModalComponent, {
      data: {
        id: data.id,
        etiqueta: 'plantilla',
        nombre: '"' + data.plantilla + '"'
      }
    });
    await dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(data.id).subscribe(data => {
          if (data) {
            this.scriptGL.printEliminarSnackBar(data);
            this.getPage();
          } else {
            this.scriptGL.printSnackbar(3, 1, 'plantilla', null, 5, false, null, null);
          }
        }, error => {
          this.scriptGL.printErrorSnackBar(error);
          this.getPage();
        });
      }
    });
  }
  
}








