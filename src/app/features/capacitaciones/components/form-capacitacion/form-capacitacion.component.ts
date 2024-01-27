import { environment } from 'src/environments/environment';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AppComponent } from 'src/app/app.component';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { CapacitacionModel } from 'src/app/core/models/capacitaciones/capacitacion-model';
import { AdministracionWebService } from 'src/app/features/administracion-pagina-contenido/services//administracion-web.service';
import { v4 as uuidv4 } from 'uuid';
import { ImagePreviewComponent } from 'src/app/shared/components/modals/image-preview/image-preview.component';

interface Area {
  value: string;
  viewValue: string;
}

interface Tipo {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-form-capacitacion',
  templateUrl: './form-capacitacion.component.html',
  styleUrls: ['./form-capacitacion.component.css']
})
export class FormCapacitacionComponent implements OnInit, OnChanges {
  fileEndpoint:string = environment.apiUrl+'/files/getUrl?pathfile=';

  selectedTipo = null;

  breakpoint: number;
  formulario: FormGroup;

  dataSource = null;

  isUpdate = false;

  fechaInicioYFinValidos = true;

  pathImagenPerfil = '';
  pathPortada = '';

  areas: Area[] = [
    {value: 'atraccionInversiones', viewValue: 'Atracción de inversiones'},
    {value: 'comercioExterior', viewValue: 'Comercio exterior'},
    {value: 'proyectosEstrategicos', viewValue: 'Proyectos estratégicos'}
  ]

  tipos: Tipo[] = [
    {value: 1, viewValue: 'Virtual asíncrona por invitación'},
    {value: 2, viewValue: 'Virtual asíncrona pública'},
    {value: 3, viewValue: 'Virtual síncrona por invitación'},
    {value: 4, viewValue: 'Virtual síncrona pública'},
    {value: 5, viewValue: 'Presencial por invitación'},
    {value: 6, viewValue: 'Presencial pública'}
  ]

  pathfileImagenPerfil = '';
  oldPathfileImagenPerfil = null;

  pathfilePortada = '';
  oldPathfilePortada = null;

  @Input() formUpdate: CapacitacionModel;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    public scriptGL: ScriptsGlobalService,
    private appC: AppComponent,
    private awService: AdministracionWebService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.breakpoint = this.scriptGL.getOnResize();
    this.formulario = this.fb.group({
      id: [],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      subarea: ['', Validators.required],
      tipo: ['', Validators.required],
      lugar: [null],
      link: [null],
      activo: [false],
      imagenPerfil: [null],
      portada: [null],
      createdAt: [''],
      updatedAt: [null],
    });
    this.getMultimedia();
    this.appC.cargandoTexto = "Cargando";
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.formUpdate.currentValue) {
      this.formulario.patchValue(this.formUpdate);
      this.isUpdate = true;
      this.pathfileImagenPerfil = this.formUpdate.imagenPerfil;
      this.pathfilePortada = this.formUpdate.portada;
      this.pathImagenPerfil = this.formUpdate.imagenPerfil;
      this.pathPortada = this.formUpdate.portada;
      this.getMultimedia();
    }
  }

  onResize(event) {
    this.breakpoint = this.scriptGL.getOnResize();
  }

  seleccionadoTipo(){
    switch (this.selectedTipo) {
      case 5:
      case 6:
        this.formulario.controls['lugar'].setValidators([Validators.required]);
        this.formulario.controls['lugar'].updateValueAndValidity();
        break;
      default:
        this.formulario.controls['lugar'].setValue(null);
        this.formulario.controls['lugar'].clearValidators();
        this.formulario.controls['lugar'].updateValueAndValidity();
        break;
    }
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

  validaFechasInicioYFin() {
    const fechaInicio = this.formulario.controls["fechaInicio"].value;
    const fechaFin = this.formulario.controls["fechaFin"].value;
    this.fechaInicioYFinValidos = this.scriptGL.validaAnteriorOIgual(fechaInicio, fechaFin);
    return this.fechaInicioYFinValidos;
  }

  getMultimedia(){
    if(this.pathfileImagenPerfil != ''){
      this.pathfileImagenPerfil = this.fileEndpoint+this.pathfileImagenPerfil;

    }
    if(this.pathfilePortada != ''){
      this.pathfilePortada = this.fileEndpoint+this.pathfilePortada;
    }
  }

  changeFile(key: string) {
    this.appC.cargando = true;

    let arrMimes = ['image/png','image/jpg','image/jpeg','image/gif'];
    const inputNode: any = document.getElementById(key);
    let metadata = inputNode.files[0];
    if(arrMimes.indexOf(metadata.type) > -1){
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
        reader.readAsDataURL(inputNode.files[0]);
        reader.onload = (e: any) => {
          switch (key) {
            case "inputImagenPerfil":
              this.oldPathfileImagenPerfil = this.pathfileImagenPerfil;
              this.pathfileImagenPerfil = e.target.result;
              break;
            case "inputPortada":
              this.oldPathfilePortada = this.pathfilePortada;
              this.pathfilePortada = e.target.result;
              break;
          }
          this.appC.cargando = false;
        }
        reader.onerror = (e:any)=>{
          this.appC.cargando = false;
          this.scriptGL.printSnackbar(15,null,null,"Ocurrió un error al intentar leer el archivo",5,false,null,null);
        };
      }
      else{
        this.appC.cargando = false;
        this.scriptGL.printSnackbar(15,null,null,"No es posible leer el archivo desde este dispositivo",5,false,null,null);
      }
    }
    else{
      this.appC.cargando = false;
      this.scriptGL.printSnackbar(15,null,null,"El archivo no corresponde a un formato de imagen compatible (image/png, image/jpg, image/jpeg, image/gif)",5,false,null,null);
    }
  }

  cancelChangeFile(key: string){
    switch (key) {
      case "inputImagenPerfil":
        this.pathfileImagenPerfil = this.oldPathfileImagenPerfil;
        this.oldPathfileImagenPerfil = null;
        break;
      case "inputPortada":
        this.pathfilePortada = this.oldPathfilePortada;
        this.oldPathfilePortada = null;
      break;
    }
    const inputNode: any = document.getElementById(key);
    inputNode.value='';
  }

  uploadFile(key: string){
    this.appC.cargando = true;
    const inputNode: any = document.getElementById(key);
    let
      file: File = inputNode.files[0],
      formData: FormData = new FormData(),
      headers = new Headers(),
      strPath = "";
    const fileExtension = file.name.slice(file.name.lastIndexOf('.') - file.name.length);

    switch (key) {
      case "inputImagenPerfil":
        if (this.oldPathfileImagenPerfil == '') {
          strPath = "capacitaciones/"+ uuidv4()+fileExtension;
        }else{
          strPath = this.oldPathfileImagenPerfil.split("?pathfile=")[1];
        }
      break;
    case "inputPortada":
        if (this.oldPathfilePortada == '') {
          strPath = "capacitaciones/"+ uuidv4()+fileExtension;
        }else{
          strPath = this.oldPathfileImagenPerfil.split("?pathfile=")[1];
        }
      break;
    }
    formData.append("pathfile",strPath);
    formData.append("file",file,strPath);
    headers.append("Content-Type","multipart/formdata");
    headers.append("Accept","application/json");

    switch (key) {
      case "inputImagenPerfil":
        if (this.oldPathfileImagenPerfil == '') {
          this.awService.uploadFileOriginalName(formData,headers).subscribe((resp)=>{
            this.appC.cargando = false;
            this.scriptGL.printSnackbar(15,null,null,"Imagen cargada exitosamente",5,false,null,null);
            this.oldPathfileImagenPerfil = null;
            this.pathImagenPerfil = resp;
          },(error) => {
            this.appC.cargando = false;
            this.pathImagenPerfil = '';
            this.scriptGL.printSnackbar(15,null,null,"Ocurrió un error al intentar cargar la imagen en el servidor",5,false,null,null);
          });
        }else{
          this.awService.updateFile(formData,headers).subscribe((resp)=>{
            this.appC.cargando = false;
            this.scriptGL.printSnackbar(15,null,null,"Imagen actualizada exitosamente",5,false,null,null);
            this.oldPathfileImagenPerfil = null;
            this.pathImagenPerfil = this.formUpdate.imagenPerfil;
          },(error) => {
            this.appC.cargando = false;
            this.pathImagenPerfil = this.formUpdate.imagenPerfil;
            this.scriptGL.printSnackbar(15,null,null,"Ocurrió un error al intentar actualizar la imagen en el servidor",5,false,null,null);
          });
        }
      break;
      case "inputPortada":
        if (this.oldPathfilePortada == '') {
          this.awService.uploadFileOriginalName(formData,headers).subscribe((resp)=>{
            this.appC.cargando = false;
            this.scriptGL.printSnackbar(15,null,null,"Imagen cargada exitosamente",5,false,null,null);
            this.oldPathfilePortada = null;
            this.pathPortada = resp;
          },(error) => {
            this.appC.cargando = false;
            this.pathPortada = '';
            this.scriptGL.printSnackbar(15,null,null,"Ocurrió un error al intentar cargar la imagen en el servidor",5,false,null,null);
          });
        }else{
          this.awService.updateFile(formData,headers).subscribe((resp)=>{
            this.appC.cargando = false;
            this.scriptGL.printSnackbar(15,null,null,"Imagen actualizada exitosamente",5,false,null,null);
            this.oldPathfilePortada = null;
            this.pathPortada = this.formUpdate.portada;
          },(error) => {
            this.appC.cargando = false;
            this.pathPortada = this.formUpdate.portada;
            this.scriptGL.printSnackbar(15,null,null,"Ocurrió un error al intentar actualizar la imagen en el servidor",5,false,null,null);
          });
        }
      break;
    }
  }

  openModalImage(url: String){
    const dialogRef = this.dialog.open(ImagePreviewComponent, {
      width: '70%',
      data: {
        url: url,
      },
    });
  }
}
