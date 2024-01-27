import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { EliminarModalComponent } from 'src/app/shared/components/modals/eliminar-modal/eliminar-modal.component';
import { PreguntasService } from '../../service/preguntas.service';

@Component({
  selector: 'app-page-pregunta',
  templateUrl: './page-pregunta.component.html',
  styleUrls: ['./page-pregunta.component.css']
})
export class PagePreguntaComponent implements OnInit {
  displayedColumns: string[] = ['pregunta', 'detalle', 'respuestaA', 'respuestaB', 'respuestaC', 'respuestaD', 'respuestaCorrecta', 'acciones'];
  dataSource = null;
  isCharge = false;

  @Input() idTema;
  @Output() goUpdate: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private router: Router,
    private service: PreguntasService,
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
    await this.service.page(this.idTema).subscribe(data => {
      if (data.length > 0) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isCharge = true;
      } else {
        this.dataSource = null;
        this.isCharge = true;
        this.scriptGL.printSnackbar(2, 1, 'pregunta', null, 5, false, null, null);
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
        etiqueta: 'pregunta',
        nombre: '"' + data.pregunta + '"'
      }
    });
    await dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(data.id).subscribe(data => {
          if (data) {
            this.scriptGL.printEliminarSnackBar(data);
            this.getPage();
          } else {
            this.scriptGL.printSnackbar(3, 1, 'pregunta', null, 5, false, null, null);
          }
        }, error => {
          this.scriptGL.printErrorSnackBar(error);
          this.getPage();
        });
      }
    });
  }
}
