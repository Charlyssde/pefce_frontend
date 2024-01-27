import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA , MatDialog} from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { Alerts } from 'src/app/core/utils/alerts';
import { AutodiagnosticoModel } from 'src/app/core/models/autodiagnostico/autodiagnostico.model';
import { AutodiagnosticoService } from 'src/app/core/services/autodiagnostico.service';
import { UsersService } from 'src/app/features/users/services/users.service';
import { FileModel } from 'src/app/core/models/files/file.model';
import { v4 as uuidv4 } from 'uuid';
import { PdfPreviewComponent } from 'src/app/shared/components/modals/pdf-preview/pdf-preview.component';
import { DeleteModalComponent } from 'src/app/shared/components/modals/delete-modal/delete-modal.component';
import { EmpresaModel } from 'src/app/core/models/empresas/empresa.model';
import { EnterprisesService } from 'src/app/features/enterprises/services/enterprises.service';

@Component({
  selector: 'app-autodiagnostico',
  templateUrl: './autodiagnostico.component.html',
  styleUrls: ['./autodiagnostico.component.css']
})

export class AutodiagnosticoComponent implements OnInit {
  
  //autodiagnostico: AutodiagnosticoModel = new AutodiagnosticoModel();  
  empresa: EmpresaModel = new EmpresaModel();
  domiciliofiscal: String = "";

  cifDocument: FileModel;
  cifPreview: any = null;

  opinionDocument: FileModel;
  opinionPreview: any = null;


  @ViewChild('cifInput') cifInput: ElementRef;
  @ViewChild('opinionInput') opinionInput: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<AutodiagnosticoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,    
    private dialog: MatDialog,
    public lib: ScriptsGlobalService,    
    private enterprisesService: EnterprisesService,
    private autodiagnosticoService: AutodiagnosticoService,
    private alerts: Alerts
  ) 
  {    
    //this.empresa.autodiagnostico.empresa = new EmpresaModel();
    this.getAutodiagnostico(); 
  }  

  ngOnInit() {
  }

  validarFormularioAutodiagnostico(){
    let valido = false;
    //if(this.autodiagnostico) {
      valido = true
    //}
    return valido;
  }

  getAutodiagnostico(){
    console.log( this.data );
    let usuario = this.lib.getUserSessionData();
    if( usuario.perfil.nombre == "Empresa"){
      this.enterprisesService.getEnterpriseByUserId( usuario.idUsuario ).subscribe(response =>{
          //this.autodiagnosticoService.getAutodiagnostico( response.id ).subscribe((response)=>{
          this.enterprisesService.findById(response.id).subscribe( response => {
            if(response){          
              if( response.id != null){
                this.empresa = response;
                //this.autodiagnostico = response.autodiagnostico;
                this.prepareFiles(response.autodiagnostico);
              }
            }          
          });
      });
    }else{
      this.enterprisesService.findById(this.data.enterpriseId).subscribe( response => {
        if(response){          
          if( response.id != null){
            this.empresa = response;
            //this.autodiagnostico = response.autodiagnostico;
            this.prepareFiles(response.autodiagnostico);
          }
        }          
      });      
    }  
  }

  createAutodiagnostico(){

    
      let
        //autodiagnostico = this.formAutodiagnostico.getRawValue(),        
        date = new Date()

        if( this.empresa.autodiagnostico.id != null){
          this.empresa.autodiagnostico.created_at = date;
        }        
        this.empresa.autodiagnostico.estatus = true;        
        this.empresa.autodiagnostico.updated_at = date;
        //this.empresa.autodiagnostico.empresa.id = this.data.autodiagnostico;

      const formData = new FormData();
      formData.append("empresa", JSON.stringify(this.empresa));

      formData.append("cif", JSON.stringify( this.cifInput !== undefined ? this.cifDocument : null));
      formData.append("opinion", JSON.stringify( this.opinionInput !== undefined ? this.opinionDocument : null));
      formData.append("cifArchivo", this.cifInput !== undefined ? this.cifInput.nativeElement.files.length > 0 ? this.cifInput.nativeElement.files[0] : [] : [] );
      formData.append("opinionArchivo", this.opinionInput !== undefined ? this.opinionInput.nativeElement.files.length > 0 ? this.opinionInput.nativeElement.files[0] : [] : [] );


      this.autodiagnosticoService.postAutodiagnostico( formData ).subscribe((response)=>{
        
        if(response){
          
          if( response.id != null){
            //this.autodiagnostico = response;
            this.prepareFiles(response);
            this.alerts.printSnackbar(15,null,null,'Su autodiagnóstico fue almacenado de manera satisfactoria, y se notifico al personal de SEDECOP, una vez valorado, nos pondremos en contacto con usted para darle seguimiento, gracias!',5,false,null,null);  
            this.closeModal();
          }
        }      
      },(error)=>{
        this.alerts.printSnackbar(15,null,null,'¡La empresa no ha registrado su autodiagnostico!',5,false,null,null);
      });
    
  }

  closeModal(): void {
    this.dialogRef.close();    
  }

  onChangeCoincide(coincide: any): void{
    if( coincide == "Si" ){
      this.empresa.autodiagnostico.domicilio_fisico = this.domiciliofiscal;
      this.empresa.autodiagnostico.municipio_fisico = this.empresa.domicilios[0].municipio;
    }else{
      this.empresa.autodiagnostico.domicilio_fisico = "";
      this.empresa.autodiagnostico.municipio_fisico = "";

    }
  }

  onCifUploaded(target: any, archivoPreview) {
    let
      isUpdate: boolean = this.cifPreview !== null && !(archivoPreview.uri.includes('base64')),
      allowedMimes: string[] = ['application/pdf'],
      file: File = target.files[0],
      splittedName: string[] = (file.name).split("."),
      extension: string = splittedName[(splittedName.length - 1)],
      name: string = uuidv4(),
      url: string = "/autodiagnosticos/" + this.empresa.autodiagnostico.id + "/cif/" + name + "." + extension,
      tipo: string = "pdf",
      mime: string = file.type;

    if (allowedMimes.indexOf(mime) > -1) {
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
        reader.onload = (e: any) => { this.cifPreview = { fileData: file, uri: e.target.result }; };
        reader.readAsDataURL(file);
        let archivo: FileModel = new FileModel();
        archivo.id = isUpdate ? archivoPreview.fileData.id : null;
        archivo.caption = isUpdate ? archivoPreview.fileData.caption : name;
        archivo.estatus = true;
        archivo.mime = mime;
        archivo.tipo = tipo;
        archivo.url = isUpdate ? archivoPreview.fileData.url : url;
        this.cifDocument = archivo;
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
      this.cifInput.nativeElement.value = null;
      this.alerts.printSnackbar(15, null, null, "Solo se permiten archivos con formatos png, gif, jpg o jpeg.", 5, false, null, null);
    }
  }

  onClickRemovecifDocument() {
    if(this.cifDocument[0].id !== null){
      this.deleteFile(this.cifDocument[0].id);
    }
    this.cifDocument=null;
    this.cifPreview=null;
    this.cifInput.nativeElement.value=null;
  }  

  onOpinionUploaded(target: any, archivoPreview) {
    let
      isUpdate: boolean = this.opinionPreview !== null && !(archivoPreview.uri.includes('base64')),
      allowedMimes: string[] = ['application/pdf'],
      file: File = target.files[0],
      splittedName: string[] = (file.name).split("."),
      extension: string = splittedName[(splittedName.length - 1)],
      name: string = uuidv4(),
      url: string = "/autodiagnosticos/" + this.empresa.autodiagnostico.id + "/opinion/" + name + "." + extension,
      tipo: string = "pdf",
      mime: string = file.type;

    if (allowedMimes.indexOf(mime) > -1) {
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
        reader.onload = (e: any) => { this.opinionPreview = { fileData: file, uri: e.target.result }; };
        reader.readAsDataURL(file);
        let archivo: FileModel = new FileModel();
        archivo.id = isUpdate ? archivoPreview.fileData.id : null;
        archivo.caption = isUpdate ? archivoPreview.fileData.caption : name;
        archivo.estatus = true;
        archivo.mime = mime;
        archivo.tipo = tipo;
        archivo.url = isUpdate ? archivoPreview.fileData.url : url;
        this.opinionDocument = archivo;
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
      this.opinionInput.nativeElement.value = null;
      this.alerts.printSnackbar(15, null, null, "Solo se permiten archivos con formatos png, gif, jpg o jpeg.", 5, false, null, null);
    }
  }

  onClickRemoveCIF() {
    if(this.opinionDocument[0].id !== null){
      this.deleteFile(this.opinionDocument[0].id);
    }
    this.opinionDocument=null;
    this.opinionPreview=null;
    this.opinionInput.nativeElement.value=null;
  }  

  onClickRemoveOpinion() {
    if(this.opinionDocument[0].id !== null){
      this.deleteFile(this.opinionDocument[0].id);
    }
    this.opinionDocument=null;
    this.opinionPreview=null;
    this.opinionInput.nativeElement.value=null;
  }  


  onClickPreviewCIF(pdfURI: string) {
    this.dialog.open(PdfPreviewComponent, {
      width: '70vw',
      data: {
        titulo: "Vista previa",
        pdf: pdfURI
      }
    });
  }  

  onClickPreviewOpinion(pdfURI: string) {
    this.dialog.open(PdfPreviewComponent, {
      width: '70vw',
      data: {
        titulo: "Vista previa",
        pdf: pdfURI
      }
    });
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
        this.autodiagnosticoService.deleteAutodiagnosticoFile(this.empresa.autodiagnostico.id, fileId).subscribe((response) => {
          if(response){
            //this.autodiagnostico = response;            
            this.alerts.printSnackbar(15, null, null, "¡Archivo eliminado!", 5, false, null, null);
          }
        }, (error) => {
          this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
        });
      }
    });

  }    

  prepareFiles(response: any) {
    this.cifDocument = response.cif;
    this.cifPreview = response.cif[0].url != "" ? { fileData: this.cifDocument[0], uri: this.cifDocument[0].url } : null;
    this.opinionDocument = response.opinion;
    this.opinionPreview = response.opinion[0].url != "" ? { fileData: this.opinionDocument[0], uri: this.opinionDocument[0].url } : null;

  }   
  

}