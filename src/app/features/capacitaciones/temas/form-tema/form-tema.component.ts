import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AppComponent } from 'src/app/app.component';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { TemaModel } from 'src/app/core/models/capacitaciones/tema-model';
import { AdministracionWebService } from 'src/app/features/administracion-pagina-contenido/services//administracion-web.service';
import { v4 as uuidv4 } from 'uuid';
import { VideoModalComponent } from 'src/app/shared/components/modals/video-modal/video-modal.component';

interface recurso {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form-tema',
  templateUrl: './form-tema.component.html',
  styleUrls: ['./form-tema.component.css']
})
export class FormTemaComponent implements OnInit {
  breakpoint: number;
  formulario: FormGroup;
  dataSource = null;
  isUpdate = false;

  recursos: recurso[] = [
    {value: 'archivo', viewValue: 'Archivo PDF'},
    {value: 'video', viewValue: 'Video'}
  ]

  @Input() formUpdate: TemaModel;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('tipoRecurso') tipoRecurso;

  pathRecurso = '';
  pathfileRecurso = '';
  oldPathfileRecurso = null;

  constructor(
    private fb: FormBuilder,
    public scriptGL: ScriptsGlobalService,
    private appC: AppComponent,
    private awService: AdministracionWebService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.breakpoint = this.scriptGL.getOnResize();
    this.formulario = this.fb.group({
      id: [],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipoRecurso: ['', Validators.required],
      recurso: [''],
      createdAt: [''],
      updatedAt: [''],
    });
    this.getMultimedia();
    this.appC.cargandoTexto = "Cargando";
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.formUpdate.currentValue) {
      this.formulario.patchValue(this.formUpdate);
      this.tipoRecurso.value = this.formUpdate.tipoRecurso;
      this.isUpdate = true;
      this.pathfileRecurso = this.formUpdate.recurso;
      this.getMultimedia();
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

  getMultimedia(){
    if(this.pathfileRecurso != ''){
      this.awService.getFileUrl(this.pathfileRecurso).subscribe((resp) => {
        this.pathfileRecurso = resp;
        this.oldPathfileRecurso = null;
      }, (error) => {  });
    }
  }

  changeFile(key: string) {
    this.appC.cargando = true;

    let arrMimes = [];
    if(this.tipoRecurso.value == 'archivo'){
      arrMimes = ['application/pdf'];
    }else{
      arrMimes = ['video/mp4'];
    }

    const inputNode: any = document.getElementById(key);
    let metadata = inputNode.files[0];
    if(arrMimes.indexOf(metadata.type) > -1){
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
        reader.readAsDataURL(inputNode.files[0]);
        reader.onload = (e: any) => {
          switch (key) {
            case "inputRecurso":
              this.oldPathfileRecurso = this.pathfileRecurso;
              this.pathfileRecurso = e.target.result;
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
      this.scriptGL.printSnackbar(15,null,null,"El archivo no corresponde a un formato de compatible",5,false,null,null);
    }
  }

  cancelChangeFile(key: string){
    switch (key) {
      case "inputRecurso":
        this.pathfileRecurso = this.oldPathfileRecurso;
        this.oldPathfileRecurso = null;
        break;
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
      case "inputRecurso":
        if (this.oldPathfileRecurso == '') {
          strPath = "temas/"+ uuidv4()+fileExtension;
        }else{
          strPath = this.oldPathfileRecurso.split("pefce/")[1];
          strPath = strPath.split("?")[0];
        }
      break;
    }
    formData.append("pathfile",strPath);
    formData.append("file",file,strPath);
    headers.append("Content-Type","multipart/formdata");
    headers.append("Accept","application/json");

    switch (key) {
      case "inputRecurso":
        if (this.oldPathfileRecurso == '') {
          this.awService.uploadFileOriginalName(formData,headers).subscribe((resp)=>{
            this.appC.cargando = false;
            this.scriptGL.printSnackbar(15,null,null,"Recurso cargado exitosamente",5,false,null,null);
            this.oldPathfileRecurso = null;
            this.pathRecurso = resp;
          },(error) => {
            this.appC.cargando = false;
            this.pathRecurso = '';
            this.scriptGL.printSnackbar(15,null,null,"Ocurrió un error al intentar cargar el recurso en el servidor",5,false,null,null);
          });
        }else{
          this.awService.updateFile(formData,headers).subscribe((resp)=>{
            this.appC.cargando = false;
            this.scriptGL.printSnackbar(15,null,null,"Recurso actualizado exitosamente",5,false,null,null);
            this.oldPathfileRecurso = null;
            this.pathRecurso = this.formUpdate.recurso;
          },(error) => {
            this.appC.cargando = false;
            this.pathRecurso = '';
            this.scriptGL.printSnackbar(15,null,null,"Ocurrió un error al intentar actualizar el recurso en el servidor",5,false,null,null);
          });
        }
      break;
    }
  }

  viewVideoPreview(url: String){
    const dialogRef = this.dialog.open(VideoModalComponent, {
      width: '70%',
      data: {
        module: "Vista previa del video",
        url: url,
      },
    });
  }
}
