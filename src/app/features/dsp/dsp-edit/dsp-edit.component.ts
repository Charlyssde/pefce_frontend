import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { DspService } from 'src/app/common/dsp.service';
import { FileModel } from 'src/app/core/models/files/file.model';
import { ImagePreviewComponent } from 'src/app/shared/components/modals/image-preview/image-preview.component';
import { MatDialog } from '@angular/material';
import { Alerts } from 'src/app/core/utils/alerts';
import { environment } from '@env/environment';

@Component({
  selector: 'app-dsp-edit',
  templateUrl: './dsp-edit.component.html',
  styleUrls: ['./dsp-edit.component.css']
})
export class DspEditComponent implements OnInit {
  @ViewChild('imagenInput'  ) imagenInput: ElementRef;


  public formEdit : FormGroup
  public id : number = 0

  imagenDocument: File;
  imagenPreview: any = null;
  imagen : any

  constructor(
    private alerts: Alerts,
    private dialog: MatDialog,
    private fb : FormBuilder,
    private route : ActivatedRoute,
    private dspService : DspService
  ) {
    this.id = this.route.snapshot.params['idDsp']    
    this.formEdit = this.fb.group({
      id : [this.id],
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
      recepcionProrroga : [null],
      archivoImagen: FileModel,
      archivo: File
    })

    this.getData()

   }


  ngOnInit() {

  }

  public getData(){
    
    this.dspService.getById(this.id).subscribe(async (response : any) => {
      this.formEdit.patchValue(response)
      this.handleDates(response)
      this.formEdit.controls['archivoImagen'].setValue(response.file)
      this.imagenPreview = {...response.file, uri : response.file.url}
      this.imagen = response.file
      // Fetch the content from the URL
      let url = environment.apiUrl+"/files/getUrl?pathfile="+response.file.url
    const result = await fetch(url);
    // Get the blob from the result
    const blob = await result.blob();
    // Create a File object from the blob
    this.imagenDocument = new File([blob], response.file.caption, { type: blob.type });
      
    })
  }

  public handleDates(value : any){
    this.formEdit.controls['solicitudSefiplan'].setValue(this.formatDate(value.solicitudSefiplan))
    this.formEdit.controls['autorizacion'].setValue(this.formatDate(value.autorizacion))
    this.formEdit.controls['recepcion'].setValue(this.formatDate(value.recepcion))
    this.formEdit.controls['vigencia'].setValue(this.formatDate(value.vigencia))
    this.formEdit.controls['solicitud'].setValue(this.formatDate(value.solicitud))
    this.formEdit.controls['solicitudProrroga'].setValue(this.formatDate(value.solicitudProrroga))
    this.formEdit.controls['oficioProrroga'].setValue(this.formatDate(value.oficioProrroga))
    this.formEdit.controls['autorizacionProrroga'].setValue(this.formatDate(value.autorizacionProrroga))
    this.formEdit.controls['recepcionProrroga'].setValue(this.formatDate(value.recepcionProrroga))
  }

  public formatDate (date : number) : Date{
    if(date === null) return null
    return new Date(date)
  }

  public onSubmitForm() {
    if(this.formEdit.valid){
      let project = this.formEdit.value;
      delete project.archivoImagen
      let data = new FormData();
      data.append('dsp', JSON.stringify(project))
      data.append('file', JSON.stringify(this.imagen))
      data.append('archivo', this.imagenDocument)
      console.log(data)
      this.dspService.update(data).subscribe((response) => {
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
        this.imagen.caption =  name;
        this.imagen.estatus = true;
        this.imagen.mime = mime;
        this.imagen.tipo = tipo;
        this.imagen.url = url;
          this.imagen.updatedAt = new Date();
          
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
