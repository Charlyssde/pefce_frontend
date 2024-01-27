import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { v4 as uuidv4 } from 'uuid';
import { ProductoModel } from 'src/app/core/models/empresas/producto.model';
import { FileModel } from 'src/app/core/models/files/file.model';
import { GeocodingService } from 'src/app/core/services/geocoding.service';
import { Alerts } from 'src/app/core/utils/alerts';
import { EnterpriseProductRequest } from 'src/app/core/utils/requests/enterprises/EntepriseProduct.request';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { ImagePreviewComponent } from 'src/app/shared/components/modals/image-preview/image-preview.component';
import { PdfPreviewComponent } from 'src/app/shared/components/modals/pdf-preview/pdf-preview.component';
import { VideoPreviewComponent } from 'src/app/shared/components/modals/video-preview/video-preview.component';
import { EnterprisesService } from '../../services/enterprises.service';
import { DeleteModalComponent } from 'src/app/shared/components/modals/delete-modal/delete-modal.component';

@Component({
  selector: 'app-enterprise-product-form',
  templateUrl: './enterprise-product-form.component.html',
  styleUrls: ['./enterprise-product-form.component.css']
})
export class EnterpriseProductFormComponent implements OnInit {

  @Input() productIn: ProductoModel;
  @Input() productId: number;
  @Input() helpsSettings: any;
  @Input() enterpriseIdIn: number;

  @Output() productOut = new EventEmitter<any>();

  // Quill
  editorStyles = {};
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
    ]
  };

  // Location autocomplete
  placeFilter: string;
  inputCounty: string;
  inputState: string;
  inputCountry: string;
  geoCodingFeatures: any;

  // Variables
  formProduct: FormGroup;

  product: ProductoModel = new ProductoModel();
  productTechnicalDocument: FileModel[];
  productImages: FileModel[];
  productVideos: FileModel[];

  technicalDocumentPreview: any = null;
  imagesPreview: any[] = [];
  videosPreview: any[] = []; 

  acceptedVideosFilesIndex: number[] = [];
  acceptedImageFilesIndex: number[] = [];

  @ViewChild('technicalDocumentInput') technicalDocumentInput: ElementRef;
  @ViewChild('productImagesInput') productImagesInput: ElementRef;
  @ViewChild('productVideosInput') productVideosInput: ElementRef;

  constructor(
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private alerts: Alerts,
    private formBuilder: FormBuilder,
    private geocodingService: GeocodingService,
    private enterprisesService: EnterprisesService
  ) { }

  ngOnInit() {
    this.formProduct = this.formBuilder.group({
      id: [null, []],
      nombre: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      empaqueEnvasado: [null, []],
      embalaje: [null, []],
      estibado: [null, []],
      condicionesAlmacenamiento: [null, []],
      transporte: [null, []],
      vidaAnaquel: [null, []],
      lugarOrigen: [null, [Validators.required]],
      estatus: [true, [Validators.required]],
      createdAt: [new Date(), [Validators.required]],
      updatedAt: [null, []],
      fichaTecnica: [null, []],
      imagenes: [null, []],
      videos: [null, []]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.productIn.currentValue) {
      if (this.productIn.id != null) {
        this.formProduct.patchValue(this.productIn);
        this.placeFilter = this.productIn.lugarOrigen;
        this.geocodingOnKeypress();
        this.prepareFiles();
      }
    }
  }

  prepareFiles() {
    this.productTechnicalDocument = this.productIn.fichaTecnica;
    this.productImages = this.productIn.imagenes;
    this.productVideos = this.productIn.videos;

    this.technicalDocumentPreview = this.productTechnicalDocument.length > 0 ? { fileData: this.productTechnicalDocument[0], uri: this.productTechnicalDocument[0].url } : null;
    this.imagesPreview = [];
    this.videosPreview = [];
    for (let file of this.productIn.imagenes) {
      this.imagesPreview.push({ fileData: file, uri: file.url });
    }
    for (let file of this.productIn.videos) {
      this.videosPreview.push({ fileData: file, uri: file.url });
    }
  }

  showHelpSection(): void {
    this.bottomSheet.open(HelpBottomSheetComponent, { data: this.helpsSettings });
  }

  async geocodingOnKeypress() {
    if ((this.placeFilter).toString().length > 3) {
      await this.geocodingService.geocodingByZipcode(this.placeFilter).subscribe((response) => {
        this.geoCodingFeatures = response.features;
        if (this.productIn) {
          let index = this.geoCodingFeatures.findIndex(place => ((place.text === this.placeFilter)));
          let place = this.geoCodingFeatures[index];
          this.displayProperty(place);
        }
      });
    }
  }
  displayProperty(place): string {
    if (place && typeof place === 'object') { return place.place_name; }
    if (place && typeof place === 'string') { return place; }
    return;
  }
  selectedZipcodeOption(feature: any): void {
    this.displayProperty(feature);
    this.formProduct.controls['lugarOrigen'].patchValue(feature.place_name);
  }



  onTechnicalDocumentUploaded(target: any, technicalPreview) {
    let
      isUpdate: boolean = this.technicalDocumentPreview !== null && !(technicalPreview.uri.includes('base64')),
      allowedMimes: string[] = ['application/pdf'],
      file: File = target.files[0],
      splittedName: string[] = (file.name).split("."),
      extension: string = splittedName[(splittedName.length - 1)],
      name: string = uuidv4(),
      url: string = "/empresas/" + this.enterpriseIdIn + "/productos/{productoId}/"+name+"." + extension,
      tipo: string = "pdf",
      mime: string = file.type;
    if (allowedMimes.indexOf(mime) > -1) {
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
        reader.onload = (e: any) => { this.technicalDocumentPreview = { fileData: file, uri: e.target.result }; };
        reader.readAsDataURL(file);
        let technicalDocument: FileModel = new FileModel();
        technicalDocument.id = isUpdate ? technicalPreview.fileData.id : null;
        technicalDocument.caption = isUpdate ? technicalPreview.fileData.caption : name;
        technicalDocument.estatus = true;
        technicalDocument.mime = mime;
        technicalDocument.tipo = tipo;
        technicalDocument.url = isUpdate ? technicalPreview.fileData.url : url;
        this.productTechnicalDocument = [technicalDocument];
        if (isUpdate) {
          technicalDocument.createdAt = technicalPreview.fileData.createdAt;
          technicalDocument.updatedAt = new Date();
          this.updateProductFile(technicalDocument, file);
        }
      }
      else {
        this.alerts.printSnackbar(15, null, null, "Ocurrió un error al intentar cargar el archivo.", 5, false, null, null);
      }
    }
    else {
      this.technicalDocumentInput.nativeElement.value = null;
      this.alerts.printSnackbar(15, null, null, "Solo se permiten archivos con formatos png, gif, jpg o jpeg.", 5, false, null, null);
    }
  }
  onClickPreviewTechnicalDocument(pdfURI: string) {
    this.dialog.open(PdfPreviewComponent, {
      width: '70vw',
      data: {
        titulo: "Vista previa",
        pdf: pdfURI
      }
    });
  }
  onClickRemoveTechnicalDocument() {
    if(this.productTechnicalDocument[0].id !== null){
      this.deleteProductFile(this.productTechnicalDocument[0].id);
    }
    this.productTechnicalDocument=[];
    this.technicalDocumentPreview=null;
    this.technicalDocumentInput.nativeElement.value=null;
  }



  onImagesUploaded(target) {
    this.productImages = [];
    let
      files: File[] = target.files,
      filesAccepted: FileModel[] = [];
    for (let index = 0; index < files.length; index++) {
      let
        fileItem: File = files[index],
        allowedMimes: string[] = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
        splittedName: string[] = (fileItem.name).split("."),
        extension: string = splittedName[(splittedName.length - 1)],
        name: string = uuidv4(),
        url: string = "/empresas/" + this.enterpriseIdIn + "/productos/{productoId}/"+name+"." + extension,
        tipo: string = "imagen",
        mime: string = fileItem.type;
      if (allowedMimes.indexOf(mime) > -1) {
        if (typeof (FileReader) !== 'undefined') {
          const reader = new FileReader();
          reader.onload = (e: any) => { this.imagesPreview.push({ fileData: fileItem, uri: e.target.result }); };
          reader.readAsDataURL(fileItem);
          let image: FileModel = new FileModel();
          image.id = null;
          image.caption = name;
          image.estatus = true;
          image.mime = mime;
          image.tipo = tipo;
          image.url = url;

          filesAccepted.push(image);
          this.acceptedImageFilesIndex.push(index);
        }
        else {
          this.alerts.printSnackbar(15, null, null, "Ocurrió un error al intentar cargar el archivo.", 5, false, null, null);
        }
      }
    }
    for (let fileAccepted of filesAccepted) {
      this.productImages.push(fileAccepted);
    }
  }
  onClickRemoveUploadedImage(image: any,index: number) {
    if(image.uri.includes('base64')){
      const filesTransfer = new DataTransfer();
      let inputFiles = this.productImagesInput.nativeElement.files;
      for (let file of inputFiles) {
        if (file !== image.fileData) {
          filesTransfer.items.add(file);
        }
      }
      this.productImagesInput.nativeElement.files = filesTransfer.files;
      this.productImages.splice(index, 1);
      this.imagesPreview.splice(index, 1);
    }
    else{
      this.deleteProductFile(image.fileData.id);
    }
  }
  onClickChangeImage(target: any, imageObject: any, index: number) {
    let
      allowedMimes: string[] = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
      file: File = target.files[0],
      splittedName: string[] = (file.name).split("."),
      extension: string = splittedName[(splittedName.length - 1)],
      url: string = "/empresas/" + this.enterpriseIdIn + "/productos/" + this.productId + "/" + imageObject.caption + "." + extension,
      tipo: string = "imagen",
      mime: string = file.type;
    if (allowedMimes.indexOf(mime) > -1) {
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
        reader.onload = (e: any) => { this.imagesPreview[index] = { fileData: file, uri: e.target.result }; };
        reader.readAsDataURL(file);
        let image: FileModel = new FileModel();
        image.id = imageObject.id;
        image.caption = imageObject.caption;
        image.estatus = true;
        image.mime = mime;
        image.tipo = tipo;
        image.url = url;
        this.productTechnicalDocument[index] = image;
        image.createdAt = imageObject.createdAt;
        image.updatedAt = new Date();
        this.updateProductFile(image, file);
      }
      else {
        this.alerts.printSnackbar(15, null, null, "Ocurrió un error al intentar cargar el archivo.", 5, false, null, null);
      }
    }
    else {
      this.technicalDocumentInput.nativeElement.value = null;
      this.alerts.printSnackbar(15, null, null, "Solo se permiten archivos con formatos png, gif, jpg o jpeg.", 5, false, null, null);
    }
  }
  onClickImagePreview(imageURI: string) {
    this.dialog.open(ImagePreviewComponent, {
      width: '70vw',
      data: {
        image: imageURI
      }
    });
  }



  onVideosUploaded(target) {
    this.productVideos = [];
    let
      files: File[] = target.files,
      filesAccepted: FileModel[] = [];
    for (let index = 0; index < files.length; index++) {
      let
        fileItem: File = files[index],
        allowedMimes: string[] = ['video/webm', 'video/mp4'],
        splittedName: string[] = (fileItem.name).split("."),
        extension: string = splittedName[(splittedName.length - 1)],
        name: string = uuidv4(),
        url: string = "/empresas/" + this.enterpriseIdIn + "/productos/{productoId}/"+name+"." + extension,
        tipo: string = "video",
        mime: string = fileItem.type;
      if (allowedMimes.indexOf(mime) > -1) {
        if (typeof (FileReader) !== 'undefined') {
          const reader = new FileReader();
          reader.onload = (e: any) => { this.videosPreview.push({ fileData: fileItem, uri: e.target.result }); };
          reader.readAsDataURL(fileItem);
          let video: FileModel = new FileModel();
          video.id = null;
          video.caption = name;
          video.estatus = true;
          video.mime = mime;
          video.tipo = tipo;
          video.url = url;

          filesAccepted.push(video);
          this.acceptedVideosFilesIndex.push(index);
        }
        else {
          this.alerts.printSnackbar(15, null, null, "Ocurrió un error al intentar cargar el archivo.", 5, false, null, null);
        }
      }
    }
    for (let fileAccepted of filesAccepted) {
      this.productVideos.push(fileAccepted);
    }
  }
  onClickRemoveUploadedVideo(video: any,index: number) {
    if(video.uri.includes('base64')){
      const filesTransfer = new DataTransfer();
      let inputFiles = this.productVideosInput.nativeElement.files;
      for (let file of inputFiles) {
        if (file !== video.fileData) {
          filesTransfer.items.add(file);
        }
      }
      this.productVideosInput.nativeElement.files = filesTransfer.files;
      this.productVideos.splice(index, 1);
      this.videosPreview.splice(index, 1);
    }
    else{
      this.deleteProductFile(video.fileData.id);
    }
  }
  onClickChangeVideo(target: any, videoObject: any, index: number) {
    let
      allowedMimes: string[] = ['video/mp4','video/webm'],
      file: File = target.files[0],
      splittedName: string[] = (file.name).split("."),
      extension: string = splittedName[(splittedName.length - 1)],
      url: string = "/empresas/" + this.enterpriseIdIn + "/productos/" + this.productId + "/" + videoObject.caption + "." + extension,
      tipo: string = "video",
      mime: string = file.type;
    if (allowedMimes.indexOf(mime) > -1) {
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
        reader.onload = (e: any) => { this.videosPreview[index] = { fileData: file, uri: e.target.result }; };
        reader.readAsDataURL(file);
        let video: FileModel = new FileModel();
        video.id = videoObject.id;
        video.caption = videoObject.caption;
        video.estatus = true;
        video.mime = mime;
        video.tipo = tipo;
        video.url = url;
        this.productTechnicalDocument[index] = video;
        video.createdAt = videoObject.createdAt;
        video.updatedAt = new Date();
        this.updateProductFile(video, file);
      }
      else {
        this.alerts.printSnackbar(15, null, null, "Ocurrió un error al intentar cargar el archivo.", 5, false, null, null);
      }
    }
    else {
      this.technicalDocumentInput.nativeElement.value = null;
      this.alerts.printSnackbar(15, null, null, "Solo se permiten archivos con formatos png, gif, jpg o jpeg.", 5, false, null, null);
    }
  }
  onClickVideoPreview(videoURI: string) {
    this.dialog.open(VideoPreviewComponent, {
      width: '70vw',
      data: {
        video: videoURI
      }
    });
  }


  updateProductFile(fileModel: FileModel, file: File) {
    let formData: FormData = new FormData();
    formData.append("fileProduct", JSON.stringify(fileModel));
    formData.append("file", file);

    this.enterprisesService.patchEnterpriseProductFile(this.enterpriseIdIn, this.productId, fileModel.id, formData).subscribe((response) => {
      if (response) {
        this.productIn = response;
        this.prepareFiles();
        this.alerts.printSnackbar(15, null, null, "¡Archivo actualizado!", 5, false, null, null);
      }
    }, (error) => {
      this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
    });
  }
  deleteProductFile(fileId: number){
    let data = {};
    data['id'] = fileId;
    data['title'] = "Eliminar archivo de producto";
    data['content'] = "¿Realmente desea eliminar el archivo de producto de los registros de la plataforma?";
    data['alerts'] = null;
    
    this.dialog.open(DeleteModalComponent,{
      width: '70vw',
      data: data
    }).afterClosed().subscribe((result) => {
      if(result !== undefined || result !== ""){
        this.enterprisesService.deleteEnterpriseProductFile(this.enterpriseIdIn,this.productId, fileId).subscribe((response) => {
          if(response){
            this.productIn = response;
            this.prepareFiles();
            this.alerts.printSnackbar(15, null, null, "¡Archivo eliminado!", 5, false, null, null);
          }
        }, (error) => {
          this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
        });
      }
    });

  }




  onSubmitForm() {
    if (this.formProduct.valid) {
      let
        product = this.formProduct.getRawValue(),
        enterpriseProductRequest: EnterpriseProductRequest = new EnterpriseProductRequest();

      enterpriseProductRequest.product = product;
      enterpriseProductRequest.productTechnicalDocument = this.productTechnicalDocument;
      enterpriseProductRequest.productImages = this.productImages;
      enterpriseProductRequest.productVideos = this.productVideos;

      const formData = new FormData();
      formData.append("enterpriseProduct", JSON.stringify(enterpriseProductRequest));
      formData.append("technicalDocument", this.technicalDocumentInput.nativeElement.files.length > 0 ? this.technicalDocumentInput.nativeElement.files[0] : []);
      if (this.productImagesInput.nativeElement.files.length > 0) {
        for (let index = 0; index < this.productImagesInput.nativeElement.files.length; index++) {
          formData.append("images", this.productImagesInput.nativeElement.files[index]);
        }
      }
      if (this.productVideosInput.nativeElement.files.length > 0) {
        for (let index = 0; index < this.productVideosInput.nativeElement.files.length; index++) {
          formData.append("videos", this.productVideosInput.nativeElement.files[index]);
        }
      }

      this.productOut.emit(formData);
    }
    else {
      this.alerts.printSnackbar(15, null, null, "Verifica que el formulario fue llenado correctamente", 5, false, null, null);
    }
  }

}
