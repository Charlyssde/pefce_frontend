import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { PromocionDigitalModel } from 'src/app/core/models/promocion-digital/promocion-digital-model';

@Component({
  selector: 'app-form-promocion-digital',
  templateUrl: './form-promocion-digital.component.html',
  styleUrls: ['./form-promocion-digital.component.css']
})
export class FormPromocionDigitalComponent implements OnInit, OnChanges {

  breakpoint: number;
  formulario: FormGroup;

  dataSource = null;

  isUpdate = false;

  editorStyles = {
    height: '400px'
  }

  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      // ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      // [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      // [{ 'direction': 'rtl' }],                         // text direction

      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ]
  }

  @Input() formUpdate: PromocionDigitalModel;
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
      idUsuario: [''],
      nombre: ['', Validators.required],
      plantilla: [''],
      activo: [''],
      createdAt: [''],
      updatedAt: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.formUpdate.currentValue) {
      this.formulario.patchValue(changes.formUpdate.currentValue);
      this.isUpdate = true;
    }
  }

  onResize(event) {
    this.breakpoint = this.scriptGL.getOnResize();
  }

  validForm() {
    return this.formulario.valid;
  }

  resetForm() {
    this.formulario.reset();
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
