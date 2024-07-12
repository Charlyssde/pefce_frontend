import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogoService } from 'src/app/common/catalogos.service';
import { DspModel } from 'src/app/core/models/dsp/dsp-model';
import { CoreAuthService } from 'src/app/core/services/core-auth.service';
import { ProyectosService } from '../../proyectos/services/proyectos.service';
import { Alerts } from 'src/app/core/utils/alerts';
import { FileModel } from 'src/app/core/models/files/file.model';
import { v4 as uuidv4 } from 'uuid';
import { ImagePreviewComponent } from 'src/app/shared/components/modals/image-preview/image-preview.component';
import { MatDialog } from '@angular/material';
import { DspService } from 'src/app/common/dsp.service';
import { log } from 'console';

@Component({
  selector: 'app-dsp-nuevo',
  templateUrl: './dsp-nuevo.component.html',
  styleUrls: ['./dsp-nuevo.component.css']
})
export class DspNuevoComponent implements OnInit {
  @ViewChild('imagenInput') imagenInput: ElementRef;
  formUpdate: DspModel;
  idProyecto: number;

  editorStyles = {};
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
    ]
  };
  
  imagenDocument: File;
  imagenPreview: any = null;
  imagen : any

  session: any;

  folio: string = 'No asignado';
  formProject: FormGroup;
  
  constructor(    
    private catalogosService: CatalogoService,
    private coreAuthService: CoreAuthService,
    private dspService: DspService,
    private alerts: Alerts,
    private formBuilder: FormBuilder, 
    private dialog: MatDialog
  ) {
  }

  /*
  id: number;
    solicitudSefiplan : Date
    numeroDSP : string
    autorizacion : Date
    recepcion : Date
    importe : number
    descripcion : string
    concepto : string
    codigoPresupuestal : string
    vigencia : Date
    solicitud : Date
    solicitudProrroga : Date
    oficioProrroga : string
    autorizacionProrroga : Date
    recepcionProrroga : Date
    file : FileModel    
  */
  ngOnInit() {
    this.session = this.coreAuthService.getUserSessionData();
    this.formProject = this.formBuilder.group({
      id : [0],
      solicitudSefiplan : [null],
      numeroDSP : ['', Validators.required],
      autorizacion : [null],
      recepcion : [null, Validators.required],
      importe : [0, Validators.required],
      descripcion : ['', Validators.required],
      concepto : ['', Validators.required],
      codigoPresupuestal : ['', Validators.required],
      vigencia : [null, Validators.required],
      solicitud : [null],
      solicitudProrroga : [null],
      oficioProrroga : [null],
      autorizacionProrroga : [null],
      recepcionProrroga : [null]
    });
  }

  showHelpSection(){}

  onSubmitForm(){
    if(this.formProject.valid){
      let project = this.formProject.value;
      let data = new FormData();
      data.append('dsp', JSON.stringify(project))
      data.append('file', JSON.stringify(this.imagen))
      data.append('archivo', this.imagenDocument)
      console.log(data)
      this.dspService.create(data).subscribe((response) => {
        if(response){
          this.alerts.printSnackbar(15,null,null,"DSP guardado",5,true,'/dsp',null);
        }
      },(error) => {
        this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
      });
    }
    else{
      this.alerts.printSnackbar(15,null,null,"El formulario debe ser completado",5,false,null,null);
    }
  }

  onImagenUploaded(target: any, imagenPreview) {
    this.imagenDocument = target.files[0]
    let
      isUpdate: boolean = this.imagenPreview !== null && !(imagenPreview.uri.includes('base64')),
      allowedMimes: string[] = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
      file: File = target.files[0],
      splittedName: string[] = (file.name).split("."),
      extension: string = splittedName[(splittedName.length - 1)],
      name: string = uuidv4(),
      url: string = "/dsp/MIID/imagen/" + name + "." + extension,
      tipo: string = "imagen",
      mime: string = file.type;

    if (allowedMimes.indexOf(mime) > -1) {
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
        reader.onload = (e: any) => { this.imagenPreview = { fileData: file, uri: e.target.result }; };
        reader.readAsDataURL(file);
        this.imagen = new FileModel();
        this.imagen.id = isUpdate ? imagenPreview.fileData.id : null;
        this.imagen.caption = isUpdate ? imagenPreview.fileData.caption : name;
        this.imagen.estatus = true;
        this.imagen.mime = mime;
        this.imagen.tipo = tipo;
        this.imagen.url = isUpdate ? imagenPreview.fileData.url : url;

       // this.formProject.get("file").patchValue( imagen );
        //this.formProject.get("file").patchValue( this.imagenInput.nativeElement.files[0] );

        if (isUpdate) {
          this.imagen.createdAt = imagenPreview.fileData.createdAt;
          this.imagen.updatedAt = new Date();
          
          //this.updateFile(imagentmpDocument, file);
        }
      }
      else {
        this.alerts.printSnackbar(15, null, null, "Ocurrió un error al intentar cargar el imagen.", 5, false, null, null);
      }
    }
    else {
      this.imagenInput.nativeElement.value = null;
      this.alerts.printSnackbar(15, null, null, "Solo se permiten imagens con formatos png, gif, jpg o jpeg.", 5, false, null, null);
    }
  }

  onClickPreviewImagen(imagenURI: string) {
    this.dialog.open(ImagePreviewComponent, {
      width: '70vw',
      data: {
        titulo: "Vista previa",
        image: imagenURI
      }
    });
  } 


}
