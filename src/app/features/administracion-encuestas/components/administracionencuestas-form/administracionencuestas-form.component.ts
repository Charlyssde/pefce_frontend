import { Input, OnChanges, SimpleChanges, ViewChild, ElementRef  } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { AdministracionEncuestasModel } from 'src/app/core/models/administracionencuestas/administracionencuestas-model';
import { Alerts } from 'src/app/core/utils/alerts';
import { Utils } from 'src/app/core/utils/utils';
import { AdministracionEncuestasService} from '../../services/administracionencuestas.service';
import { v4 as uuidv4 } from 'uuid';
import { FileModel } from 'src/app/core/models/files/file.model';

import { PdfPreviewComponent } from 'src/app/shared/components/modals/pdf-preview/pdf-preview.component';
import { EncuestaModel } from 'src/app/core/models/encuesta/encuesta.model';
import { DeleteModalComponent } from 'src/app/shared/components/modals/delete-modal/delete-modal.component';

@Component({
  selector: 'app-administracionencuestas-form',
  templateUrl: './administracionencuestas-form.component.html',
  styleUrls: ['./administracionencuestas-form.component.css']
})
export class AdministracionencuestasFormComponent implements OnInit {
  @Input() encuestaIn: EncuestaModel;
  @Input() encuestaId;
  @Input() encuesta;
  @Output() encuestaOut =  new EventEmitter<any>();
  @Input() encuestaIdIn: number;
  
  formEncuesta: FormGroup;

  archivoDocument: FileModel;
  archivosPreview: any = null;


  request: AdministracionEncuestasModel = new AdministracionEncuestasModel();
  @ViewChild('archivoInput') archivoInput: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private administracionEncuestaService: AdministracionEncuestasService,
    private bottomSheet: MatBottomSheet,
    private activatedRoute:ActivatedRoute,
    private dialog: MatDialog,
    private alerts: Alerts,
    public utils: Utils
  ) { 
    this.formEncuesta = this.formBuilder.group({
      id:[null],
      titulo:[null,[Validators.required]],
      descripcion:[null],
      archivo:[null],
    });
  
  }

  ngOnChanges(changes: SimpleChanges) {
    if ( changes.encuestaIn.currentValue ) {
      if (this.encuestaIn.id != null) {
        this.formEncuesta.patchValue(this.encuestaIn);        
        this.prepareFiles();
      }
    }
  }

  prepareFiles() {
    this.archivoDocument = this.encuestaIn.archivo[0];
    this.archivosPreview = this.archivoDocument.url ? { fileData: this.archivoDocument, uri: this.archivoDocument.url } : null;
  }   

  ngOnInit() {
    this.formEncuesta = this.formBuilder.group({
      id: [null, []],
      titulo: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      archivo: [null, []],
    });    
  }

  async findEncuesta(){
    await this.administracionEncuestaService.getFormResources(this.encuestaId).subscribe((response) => {
      if(response){
        this.encuesta = response.encuesta;
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  } 
  
  onSubmitForm() {
    if (this.formEncuesta.valid) {
      let
        encuesta = this.formEncuesta.getRawValue()
      const formData = new FormData();
      formData.append("encuesta", JSON.stringify(encuesta));
      formData.append("archivo", JSON.stringify(this.archivoDocument));
      formData.append("archivoDTO", this.archivoInput.nativeElement.files.length > 0 ? this.archivoInput.nativeElement.files[0] : []);

      this.encuestaOut.emit(formData);
    }
    else {
      this.alerts.printSnackbar(15, null, null, "Verifica que el formulario fue llenado correctamente", 5, false, null, null);
    }
  }

  onArchivoUploaded(target: any, archivoPreview) {
    let
      isUpdate: boolean = this.archivosPreview !== null && !(archivoPreview.uri.includes('base64')),
      allowedMimes: string[] = ['application/pdf'],
      file: File = target.files[0],
      splittedName: string[] = (file.name).split("."),
      extension: string = splittedName[(splittedName.length - 1)],
      name: string = uuidv4(),
      url: string = "/encuestas/" + name + "." + extension,
      tipo: string = "pdf",
      mime: string = file.type;

    if (allowedMimes.indexOf(mime) > -1) {
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
        reader.onload = (e: any) => { this.archivosPreview = { fileData: file, uri: e.target.result }; };
        reader.readAsDataURL(file);
        let archivo: FileModel = new FileModel();
        archivo.id = isUpdate ? archivoPreview.fileData.id : null;
        archivo.caption = isUpdate ? archivoPreview.fileData.caption : name;
        archivo.estatus = true;
        archivo.mime = mime;
        archivo.tipo = tipo;
        archivo.url = isUpdate ? archivoPreview.fileData.url : url;
        this.archivoDocument = archivo;
        if (isUpdate) {
          archivo.createdAt = archivoPreview.fileData.createdAt;
          archivo.updatedAt = new Date();
          
          //this.updateFile(archivotmpDocument, file);
        }
      }
      else {
        this.alerts.printSnackbar(15, null, null, "Ocurrió un error al intentar cargar el archivo.", 5, false, null, null);
      }
    }
    else {
      this.archivoInput.nativeElement.value = null;
      this.alerts.printSnackbar(15, null, null, "Solo se permiten archivos con formatos png, gif, jpg o jpeg.", 5, false, null, null);
    }
  }

  onClickPreviewArchivo(pdfURI: string) {
    this.dialog.open(PdfPreviewComponent, {
      width: '70vw',
      data: {
        titulo: "Vista previa",
        pdf: pdfURI
      }
    });
  }

  onClickRemoveArchivo() {
    if(this.archivoDocument[0].id !== null){
      this.deleteFile(this.archivoDocument[0].id);
    }
    this.archivoDocument=null;
    this.archivosPreview=null;
    this.archivoInput.nativeElement.value=null;
  }  
/*
  updateFile(fileModel: FileModel, file: File) {
    let formData: FormData = new FormData();
    formData.append("fileProduct", JSON.stringify(fileModel));
    formData.append("file", file);

    this.administracionEncuestaService.patchEncuestaFile(this.encuestaIdIn, fileModel.id, formData).subscribe((response) => {
      if (response) {
        this.encuestaIn = response;
        this.prepareFiles();
        this.alerts.printSnackbar(15, null, null, "¡Archivo actualizado!", 5, false, null, null);
      }
    }, (error) => {
      this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
    });
  }
  */

  deleteFile(fileId: number){
    let data = {};
    data['id'] = fileId;
    data['title'] = "Eliminar archivo de la encuesta";
    data['content'] = "¿Realmente desea eliminar el archivo de la encuesta de los registros de la plataforma?";
    data['alerts'] = null;
    
    this.dialog.open(DeleteModalComponent,{
      width: '70vw',
      data: data
    }).afterClosed().subscribe((result) => {
      if(result !== undefined || result !== ""){
        this.administracionEncuestaService.deleteEncuestaFile(this.encuestaIdIn, fileId).subscribe((response) => {
          if(response){
            this.encuestaIn = response;
            this.prepareFiles();
            this.alerts.printSnackbar(15, null, null, "¡Archivo eliminado!", 5, false, null, null);
          }
        }, (error) => {
          this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
        });
      }
    });

  }  

}
