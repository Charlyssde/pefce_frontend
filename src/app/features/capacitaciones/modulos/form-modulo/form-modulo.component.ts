import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { ModuloModel } from 'src/app/core/models/capacitaciones/modulo-model';

@Component({
  selector: 'app-form-modulo',
  templateUrl: './form-modulo.component.html',
  styleUrls: ['./form-modulo.component.css']
})
export class FormModuloComponent implements OnInit {
  breakpoint: number;
  formulario: FormGroup;
  dataSource = null;
  isUpdate = false;

  @Input() formUpdate: ModuloModel;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    public scriptGL: ScriptsGlobalService,
  ) { }

  ngOnInit() {
    this.breakpoint = this.scriptGL.getOnResize();
    this.formulario = this.fb.group({
      id: [],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      createdAt: [''],
      updatedAt: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.formUpdate.currentValue) {
      this.formulario.patchValue(this.formUpdate);
      this.isUpdate = true;
    }
  }

  onResize(event) {
    this.breakpoint = this.scriptGL.getOnResize();
  }

  validForm() {
    return this.formulario.valid;
  }

  get validFormData() {
    return this.formulario.valid;
  }

  getPage(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
