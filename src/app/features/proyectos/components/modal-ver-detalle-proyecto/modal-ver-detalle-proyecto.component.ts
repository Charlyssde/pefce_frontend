import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatPaginator, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-ver-detalle-proyecto',
  templateUrl: './modal-ver-detalle-proyecto.component.html',
  styleUrls: ['./modal-ver-detalle-proyecto.component.css']
})
export class ModalVerDetalleProyectoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalVerDetalleProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  displayedColumns: string[] = ['accion', 'usuario', 'fecha'];
  //displayedColumns2: string[] = ['tarea', 'estatus', 'fecha'];
  dataSource = null;
  //dataSource2 = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  compare( a, b ) {
    if ( a.createdAt > b.createdAt ){
      return -1;
    }
    if ( a.createdAt < b.createdAt ){
      return 1;
    }
    return 0;
  }

  ngOnInit() {
    console.log(this.data);
    if(this.data.historico){
      this.data.historico.sort(this.compare);
      this.dataSource = new MatTableDataSource(this.data.historico.slice(0,5));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    /*
    if(this.data.tareas){
      this.data.tareas.sort(this.compare);
      this.dataSource2 = new MatTableDataSource(this.data.tareas.slice(0,5));
      this.dataSource2.paginator = this.paginator;
      this.dataSource2.sort = this.sort;
    }
    */
  }
}
