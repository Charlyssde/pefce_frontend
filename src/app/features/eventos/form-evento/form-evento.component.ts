import { EventosService } from './../service/eventos.service';
import { EventoComponent } from './../evento/evento.component';
import { Component, Inject, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MatDialog, MAT_DIALOG_DATA  } from '@angular/material';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { EventoModel } from 'src/app/core/models/eventos/eventos-model';
import { UsersService } from 'src/app/features/users/services/users.service';
import { AppComponent } from 'src/app/app.component';
import { CatalogoService } from 'src/app/features/catalogos/services/catalogo.service';
//import { DirectoriosEmpresarialesService } from '../../directorios-empresariales/services/directorios-empresariales.service';
import { FileModel } from 'src/app/core/models/files/file.model';
import { v4 as uuidv4 } from 'uuid';
import { PdfPreviewComponent } from 'src/app/shared/components/modals/pdf-preview/pdf-preview.component';
import { Alerts } from 'src/app/core/utils/alerts';
import { ImagePreviewComponent } from 'src/app/shared/components/modals/image-preview/image-preview.component';

@Component({
  selector: 'app-form-evento',
  templateUrl: './form-evento.component.html',
  styleUrls: ['./form-evento.component.css']
})
export class FormEventoComponent implements OnInit, OnChanges {

  breakpoint: number;
  formulario: FormGroup;

  dataSource = null;

  empresasColumns: string[] = ['rbtn', 'nombreLegal', 'rfc'];
  emppresasTitleColumns: string[] = ['Opción', 'Nombre de la empresa', 'RFC'];
  empresas = null;
  empresaSeleccionada = null;

  contactosSelect: any[] = null;

  areasSelect: any[] = null;
  eEstatus: any = [];
  eModalidadEvento: any = [];
  ePrivacidadEvento: any = [];
  eTipoEvento: any = [];
  eTiposSolicitud: any = [];
  eSubarea: any = [];

  infoUbicacion = null;
  dateStart = null;
  dateEnd = null;

  responsablesColumns: string[] = ['rbtn', 'nombreCompleto', 'correo', 'telefono'];
  responsablesTitleColumns: string[] = ['Opción', 'Nombre del responsable', 'Email', 'Teléfono'];
  responsables = null;

  isUpdate = false;
  rbtnEId = null;
  rbtnUEId = null
  fechaInicioYFinValidos = true;

  imagenDocument: FileModel;
  imagenPreview: any = null;

  @ViewChild('imagenInput') imagenInput: ElementRef;
  @Input() formUpdate: EventoModel;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filtroEmpresas') fEmpresas: ElementRef;
  @ViewChild('filtroResponsables') fResponsables: ElementRef;

  constructor(
    //public dialogRef: MatDialogRef<FormEventoComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: any,    
    private fb: FormBuilder,
    public scriptGL: ScriptsGlobalService,
    private catService: CatalogoService,
    public appC: AppComponent,
    private master: EventoComponent,
    private alerts: Alerts,    
    private dialog: MatDialog

  ) { }

  ngOnInit() {
    this.eModalidadEvento = this.scriptGL.eModalidadEvento;
    this.ePrivacidadEvento = this.scriptGL.ePrivacidadEvento;
    this.eTiposSolicitud = this.scriptGL.eTiposSolicitud;
    this.eSubarea = this.scriptGL.eSubarea;
    this.eEstatus = this.master.eEstatus;
    this.appC.cargandoTexto = "Cargando";
    this.breakpoint = this.scriptGL.getOnResize();
    this.formulario = this.fb.group({
      id: [],
      responsableId: [],
      tipoId: [],
      nombreEvento: [],
      ponentes: [],
      descripcion: [],
      fechaInicio: [],
      fechaFin: [],
      modalidad:[],
      privacidad:[],
      sede:[],
      domicilio:[],
      estatus: [],
      observaciones: [],
      activo: [],
      createdAt: [],
      updatedAt: [],
      archivoimagen: FileModel,
      archivo: File
    });
    console.log("Aquí Inicio");
    this.getTiposEvento();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.formUpdate.currentValue) {
      this.formulario.patchValue(changes.formUpdate.currentValue);
      this.isUpdate = true;
      this.prepareFiles();
    }
  }

  applyEmpresasFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.empresas.filter = filterValue.trim().toLowerCase();
    if (this.empresas.paginator) {
      this.empresas.paginator.firstPage();
    }
  }

  applyResponsablesFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.responsables.filter = filterValue.trim().toLowerCase();
    if (this.responsables.paginator) {
      this.responsables.paginator.firstPage();
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

  validaFechasInicioYFin() {
    const fechaInicio = this.formulario.controls["fechaInicio"].value;
    const fechaFin = this.formulario.controls["fechaFin"].value;

    if( new Date(fechaInicio) < new Date() ) this.formulario.controls["fechaInicio"].patchValue("");
    if( new Date(fechaFin) < new Date() ) this.formulario.controls["fechaFin"].patchValue("");

    this.fechaInicioYFinValidos = this.scriptGL.validaAnteriorOIgual(fechaInicio, fechaFin);

    return this.fechaInicioYFinValidos;
  }

  async getAreas(){
    await this.catService.getAllByTipoCatalogo('AREAS').subscribe(resp => {
      if (resp.length > 0) {
        this.areasSelect = resp;

      } else {
        this.areasSelect = null;
        this.scriptGL.printSnackbar(2, 2, 'áreas', null, 5, false, null, null);
      }
    });
  }
  
  async getTiposEvento(){
    await this.catService.getAllByTipoCatalogo('TIPOS_EVENTO').subscribe(resp => {
      if (resp.length > 0) {
        this.eTipoEvento = resp;

      } else {
        this.eTipoEvento = null;
        this.scriptGL.printSnackbar(2, 2, 'tipos de evento', null, 5, false, null, null);
      }
    });
  }

  onImagenUploaded(target: any, imagenPreview) {
    console.log("AAAA");
    let
      isUpdate: boolean = this.imagenPreview !== null && !(imagenPreview.uri.includes('base64')),
      allowedMimes: string[] = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
      file: File = target.files[0],
      splittedName: string[] = (file.name).split("."),
      extension: string = splittedName[(splittedName.length - 1)],
      name: string = uuidv4(),
      url: string = "/eventos/MIID/imagen/" + name + "." + extension,
      tipo: string = "imagen",
      mime: string = file.type;

    if (allowedMimes.indexOf(mime) > -1) {
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
        reader.onload = (e: any) => { this.imagenPreview = { fileData: file, uri: e.target.result }; };
        reader.readAsDataURL(file);
        let imagen: FileModel = new FileModel();
        imagen.id = isUpdate ? imagenPreview.fileData.id : null;
        imagen.caption = isUpdate ? imagenPreview.fileData.caption : name;
        imagen.estatus = true;
        imagen.mime = mime;
        imagen.tipo = tipo;
        imagen.url = isUpdate ? imagenPreview.fileData.url : url;

        this.formulario.get("archivoimagen").patchValue( imagen );
        this.formulario.get("archivo").patchValue( this.imagenInput.nativeElement.files[0] );

        if (isUpdate) {
          imagen.createdAt = imagenPreview.fileData.createdAt;
          imagen.updatedAt = new Date();
          
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

  prepareFiles() {
    this.imagenDocument = this.formUpdate.archivo[0];    
    this.imagenPreview = this.formUpdate.archivo[0].url  !== "" ? { fileData: this.formUpdate.archivo[0], uri: this.formUpdate.archivo[0].url  } : null;
  }


}
