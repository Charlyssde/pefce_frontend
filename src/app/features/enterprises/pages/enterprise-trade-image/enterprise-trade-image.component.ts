import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@env/environment';
import { file } from 'jszip';
import { ImagenComercialEmpresaModel } from 'src/app/core/models/empresas/imagen-comercial-empresa.model';
import { FileModel } from 'src/app/core/models/files/file.model';
import { Alerts } from 'src/app/core/utils/alerts';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { EnterprisesService } from '../../services/enterprises.service';

@Component({
  selector: 'app-enterprise-trade-image',
  templateUrl: './enterprise-trade-image.component.html',
  styleUrls: ['./enterprise-trade-image.component.css']
})
export class EnterpriseTradeImageComponent implements OnInit {

  helpsSettings: any = {
    'module_name': 'Imagen comercial de empresa',
    'description': 'Módulo encargado de gestionar la imagen comercial de la empresa',
    'details': [
      { 'detail': 'Cargar archivo (<span class="material-symbols-outlined">cloud_upload</span>)', 'description': 'Disparador de carga de archivos a la plataforma. El archivo es cargado hasta hacer clic en el botón de guardar.' },
      { 'detail': 'Quitar archivo (<span class="material-symbols-outlined">delete</span>)', 'description': 'Disparador de borrado de vista previa de archivos en la plataforma.' }
    ]
  };
  
  enterpriseId: number;
  enterpriseTradeImage: ImagenComercialEmpresaModel;
  FormTradeImage: FormGroup;

  
  logotipoURI: String = null;
  logotipoFile: File;
  videoURI: String = null;
  videoFile: File;

  @ViewChild('logotipoInput') logotipoInput: ElementRef;
  @ViewChild('videoInput') videoInput: ElementRef;

  constructor(
    private bottomSheet: MatBottomSheet,
    private activatedRoute: ActivatedRoute,
    private enterprisesService: EnterprisesService,
    private alerts: Alerts,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.enterpriseId = parseInt(this.activatedRoute.snapshot.paramMap.get('empresaId'));

    this.FormTradeImage = this.formBuilder.group({
      id:[null],
      eslogan:[null],
      banner1:[null],
      banner2:[null],
      estatus:[true],
      createdAt:[null],
      updatedAt:[null],
      logotipoId:this.formBuilder.group({
        id:[null],
        url:[null,Validators.required],
        caption:[null],
        tipo:[null,Validators.required],
        mime:[null,Validators.required],
        estatus:[true],
        createdAt:[null],
        updatedAt:[null],
      }),
      videoId:this.formBuilder.group({
        id:[null],
        url:[null,Validators.required],
        caption:[null],
        tipo:[null,Validators.required],
        mime:[null,Validators.required],
        estatus:[true],
        createdAt:[null],
        updatedAt:[null],
      })
    });

    this.getEnterpriseTradeImage();
  }

  async getEnterpriseTradeImage(){
    await this.enterprisesService.getEnterpriseTradeImage(this.enterpriseId).subscribe((response) => {
      if(response){
        this.enterpriseTradeImage = response;
        this.enterpriseTradeImage.logotipoId = this.enterpriseTradeImage.logotipoId !== null ? this.enterpriseTradeImage.logotipoId : new FileModel();
        this.enterpriseTradeImage.videoId = this.enterpriseTradeImage.videoId !== null ? this.enterpriseTradeImage.videoId : new FileModel();
        this.FormTradeImage.patchValue(response);

        if(this.enterpriseTradeImage.logotipoId !== null && this.enterpriseTradeImage.logotipoId.url !== null){
          this.logotipoURI = this.setURI(this.enterpriseTradeImage.logotipoId.url);
        }
        if(this.enterpriseTradeImage.videoId !== null && this.enterpriseTradeImage.videoId.url !== null){
          this.videoURI = this.setURI(this.enterpriseTradeImage.videoId.url);
        }
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }

  setURI(pathfile: string): string{
    return environment.apiUrl+"/files/getUrl?pathfile="+pathfile;}

  showHelpSection(): void {
    this.bottomSheet.open(HelpBottomSheetComponent, { data: this.helpsSettings });
  }

  onLogotipoSelected(target){
    let 
      allowedMimes: string[] = ['image/png','image/gif','image/jpg','image/jpeg'],
      file: File = target.files[0],
      splittedName: string[] = (file.name).split("."),
      name: string = splittedName[(splittedName.length -1)],
      url: string = "/empresas/"+this.enterpriseId+"/imagenComercial/logotipo."+name,
      tipo: string = "image",
      mime: string = file.type;

    if(allowedMimes.indexOf(mime) > -1){
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.logotipoURI = e.target.result;
        };
        reader.readAsDataURL(file);

        let logotipoId: FileModel = new FileModel();
        logotipoId.id = this.enterpriseTradeImage.logotipoId != null ? this.enterpriseTradeImage.logotipoId.id : null;
        logotipoId.caption = null;
        logotipoId.estatus = true;
        logotipoId.mime = mime;
        logotipoId.tipo = tipo;
        logotipoId.url = url;

        this.FormTradeImage.controls['logotipoId'].patchValue(logotipoId);
      }
      else{
        this.alerts.printSnackbar(15,null,null,"Ocurrió un error al intentar cargar el archivo.",5,false,null,null);
      }
    }
    else{
      this.logotipoInput.nativeElement.value = null;
      this.alerts.printSnackbar(15,null,null,"Solo se permiten archivos con formatos png, gif, jpg o jpeg.",5,false,null,null);
    }
  }
  
  onVideoSelected(target){
    let 
      allowedMimes: string[] = ['video/mp4','video/webm'],
      file: File = target.files[0],
      splittedName: string[] = (file.name).split("."),
      name: string = splittedName[(splittedName.length -1)],
      url: string = "/empresas/"+this.enterpriseId+"/imagenComercial/video."+name,
      tipo: string = "video",
      mime: string = file.type;

    if(allowedMimes.indexOf(mime) > -1){
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.videoURI = e.target.result;
        };
        reader.readAsDataURL(file);

        let videoId: FileModel = new FileModel();
        videoId.id = this.enterpriseTradeImage.videoId != null ? this.enterpriseTradeImage.videoId.id : null;
        videoId.caption = null;
        videoId.estatus = true;
        videoId.mime = mime;
        videoId.tipo = tipo;
        videoId.url = url;
        this.FormTradeImage.controls['videoId'].patchValue(videoId);
      }
      else{
        this.alerts.printSnackbar(15,null,null,"Ocurrió un error al intentar cargar el archivo.",5,false,null,null);
      }
    }
    else{
      this.videoInput.nativeElement.value = null;
      this.alerts.printSnackbar(15,null,null,"Solo se permiten archivos con formatos mp4 o webm.",5,false,null,null);
    }
  }

  onClickRemoveImage(){
    this.logotipoURI = null;
    this.logotipoFile = null;
    let logotipoId: FileModel = new FileModel();
    this.FormTradeImage.controls['logotipoId'].reset();
    this.logotipoInput.nativeElement.value = null;
  }
  
  onClickRemoveVideo(){
    this.videoURI = null;
    this.logotipoFile = null;
    let videoId: FileModel = new FileModel();
    this.FormTradeImage.controls['videoId'].reset();
    this.videoInput.nativeElement.value = null;
  }

  onSubmitForm(){
    if(this.FormTradeImage.valid){
      const formData = new FormData();
      let tradeImageEnterprise: ImagenComercialEmpresaModel = this.FormTradeImage.getRawValue();
      tradeImageEnterprise.createdAt = tradeImageEnterprise.createdAt === null ? new Date() : tradeImageEnterprise.createdAt;
      tradeImageEnterprise.updatedAt = new Date();
      tradeImageEnterprise.logotipoId.createdAt = tradeImageEnterprise.logotipoId.createdAt === null ? new Date() : tradeImageEnterprise.logotipoId.createdAt;
      tradeImageEnterprise.logotipoId.updatedAt = new Date();
      tradeImageEnterprise.videoId.createdAt = tradeImageEnterprise.videoId.createdAt === null ? new Date() : tradeImageEnterprise.videoId.createdAt;
      tradeImageEnterprise.videoId.updatedAt = new Date();

      formData.append("tradeImageEnterprise",JSON.stringify(tradeImageEnterprise));
      formData.append("logotipo",this.logotipoInput.nativeElement.files.length > 0 ?this.logotipoInput.nativeElement.files[0] : null);
      formData.append("video",this.videoInput.nativeElement.files.length > 0 ?this.videoInput.nativeElement.files[0] : null);

      this.enterprisesService.postEnterpriseTradeImage(this.enterpriseId,formData).subscribe((response) => {
        if(response){
          this.alerts.printSnackbar(15,null,null,"¡Imagen comercial de la empresa guardada!.",5,false,null,null);
        }

      }, (error) => {
        this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
      });
    }
    else{
      this.alerts.printSnackbar(15,null,null,"El formulario debe ser completado.",5,false,null,null);
    }
  }

}
