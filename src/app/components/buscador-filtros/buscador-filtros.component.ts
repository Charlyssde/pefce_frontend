import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { Filtro } from './filtros-interface';

@Component({
  selector: 'app-buscador-filtros',
  templateUrl: './buscador-filtros.component.html',
  styleUrls: ['./buscador-filtros.component.css']
})
export class BuscadorFiltrosComponent implements OnInit {

  valueSearch: FormControl = new FormControl(undefined, [Validators.required]);
  selectSearch: FormControl = new FormControl(undefined, [Validators.required]);
  @Input() filterOptions: Filtro [] = [];
  @Input() dataSourceByService: any [] = [];
  @Input() set matDataSource (dataSource: MatTableDataSource<any>) {
    if(dataSource) {
      this.dataSource = dataSource;
    }
  }
  @Output() resultados: EventEmitter<any> = new EventEmitter<any>();
  _dataSource = new MatTableDataSource([]);

  constructor(
    public scriptGL: ScriptsGlobalService
  ) { }

  ngOnInit() {
    this.selectSearch.valueChanges.subscribe(data=>{
      this.valueSearch.reset();
      this.dataSource = this.dataSourceByService;
    });
  }

  get dataSource() {
    return this._dataSource;
  }
  set dataSource(data: any) {
    this._dataSource = new MatTableDataSource(data);
  }

  get habilitarInputBusqueda() {
    return this._dataSource;
  }

  applyFilter() {
    if(this.selectSearch != null){
      const valorBusqueda = this.valueSearch.value;
      const filtro =  this.selectSearch.value;
      if(filtro && filtro.valor != 'all') {
        let resultadoBusqueda = this.scriptGL.getDatosPorFiltro(this.dataSourceByService, filtro.tipo, filtro.valor, valorBusqueda);
        this.resultados.emit(resultadoBusqueda);
      } else {
        this.dataSource.filter = valorBusqueda;
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
    }
  }
}
