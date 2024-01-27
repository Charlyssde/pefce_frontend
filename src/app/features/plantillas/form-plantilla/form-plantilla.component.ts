import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, SimpleChanges  } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AppComponent } from 'src/app/app.component';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';

@Component({
  selector: 'app-form-plantilla',
  templateUrl: './form-plantilla.component.html',
  styleUrls: ['./form-plantilla.component.css']
})

export class FormPlantillaComponent implements OnInit{
  dataSource = null;
  isUpdate = false;
  breakpoint: number;

  @Input() formUpdate: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  form = this.fb.group({
    id: [],
    nombre: new FormControl('', [Validators.required]),
    usuarioId: [''],
    createdAt: [''],
    updatedAt: [''],
    tareas: this.fb.array([])
  })

  constructor( private fb: FormBuilder, private appC: AppComponent, public scriptGL: ScriptsGlobalService,){
    
  }

  ngOnInit() {
    this.breakpoint = this.scriptGL.getOnResize();
    this.appC.cargandoTexto = "Cargando"; 
  }

  get tareas() {
    //return this.form.controls["tareas"] as FormArray;
    return this.form.get('tareas') as FormArray;
    
  }  

  addTarea() {    
    const tarea = this.fb.group({
            descripcion: new FormControl('', [Validators.required]),
            entregable: new FormControl('', [Validators.required]),
            dias: new FormControl('', [Validators.required]),
          });
    this.tareas.push( tarea );
  }

  deleteTarea(index: number) {
    this.tareas.removeAt(index);
  }


  onCancle() {
      this.form.reset();
  }

  onSubmit(formValue) {
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.formUpdate.currentValue) {
      this.form.patchValue(this.formUpdate);
      this.isUpdate = true;      
    }
  }

  validForm() {
    return this.form.valid;
  }

  get validFormData() {
    return this.form.valid;
  }

  getPage(data) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }   

}
 


