import { ProyectosService } from 'src/app/features/proyectos/services/proyectos.service';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { AppComponent } from 'src/app/app.component';
import { CatalogoService } from 'src/app/features/catalogos/services/catalogo.service';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
//import { MinutaArchivoModalComponent } from 'src/app/shared/components/models/minuta-archivo-modal/minuta-archivo-modal.component';
import { CatalogoModel } from 'src/app/core/models/catalogos/catalogo-model';
/*
import { EstadosModel } from 'src/app/core/models/catalogos/';
import { MunicipiosModel } from 'src/app/core/models/municipios-model';
 */
import { MinutaModel } from 'src/app/core/models/minutas/minuta-model';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { CapacitacionesService } from 'src/app/features/capacitaciones/service/capacitaciones.service';

import { EventosService } from 'src/app/features/eventos/service/eventos.service';
//import { FeriasService } from 'src/app/features/ferias/service/ferias.service';
//import { SolicitudesService } from 'src/app/features/solicitudes/services/solicitudes.service';
import { UsersService } from 'src/app/features/users/services/users.service';
//import { UsersService } from 'src/app/features/users/services/users.service';
import { v4 as uuidv4 } from 'uuid';
import { AdministracionWebService } from 'src/app/features/administracion-pagina-contenido/services//administracion-web.service';
import { saveAs } from 'file-saver';
import { TasksModel } from 'src/app/core/models/tareas/tasks-model';
import { ModalAgregarTareaMinutaComponent } from 'src/app/features/minutas/Modals/modal-agregar-tarea-minuta/modal-agregar-tarea-minuta.component';
import { ModalOpcionesTareasMinutaComponent } from 'src/app/features/minutas/Modals/modal-opciones-tareas-minuta/modal-opciones-tareas-minuta.component';
import { MinutasService } from 'src/app/features/minutas/service/minutas.service';
import { ProyectosModel } from 'src/app/core/models/proyectos/proyectos-model';
import { TaskModalComponent } from 'src/app/shared/components/modals/task-modal/task-modal.component';
import { CoreAuthService } from 'src/app/core/services/core-auth.service';
import { TasksService } from 'src/app/features/tasks/services/tasks.service';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-form-minuta',
  templateUrl: './form-minuta.component.html',
  styleUrls: ['./form-minuta.component.css']
})
export class FormMinutaComponent implements OnInit, OnChanges {

  breakpoint: number;
  formulario: FormGroup;

  displayedColumns: string[] = ['nombre', 'responsable', 'fechaC', 'fechaU', 'archivo', 'acciones'];
  dataSource = null;
  isCharge = false;

  isUpdate = false;

  estadoPrev: CatalogoModel = new CatalogoModel();
  estados: Array<CatalogoModel> = new Array<CatalogoModel>();

  municipioPrev: CatalogoModel = new CatalogoModel();
  municipios: Array<CatalogoModel> = new Array<CatalogoModel>();

  tipoMinutaPrev: CatalogoModel = new CatalogoModel();
  tiposMinutas: Array<CatalogoModel> = new Array<CatalogoModel>();

  temasPrev: Array<CatalogoModel> = new Array<CatalogoModel>();
  temas: Array<CatalogoModel> = new Array<CatalogoModel>();

  clasePrev: CatalogoModel = new CatalogoModel();
  clasesMinutas: Array<CatalogoModel> = new Array<CatalogoModel>();

  clases: Array<any> = new Array<any>();
  clase: any = {};

  participantesSedecop: Array<any> = new Array<any>();
  participantesExternos: Array<any> = new Array<any>();

  proyectos: any;
  proyectoPrev: ProyectosModel = null;
  proyectosVigentes: Array<ProyectosModel> = new Array<ProyectosModel>();

  participante: any = {};
  participantesPrevSedecop: Array<any> = new Array<any>();
  participantesPrevExternos: Array<any> = new Array<any>();

  tareas: Array<any> = [];
  archivos: Array<any> = [];
  minutaTareas: Array<any> = [];
  minutaArchivo: Array<any> = [];
  selectedFileName: string = "No se ha seleccionado ningún archivo";
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  formData = new FormData();

  archivosPreview: any = null;

  @Input() formUpdate: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  editorStyles = {
    height: '400px'
  }

  idsTemas: Array<any> = new Array<any>();
  idsUsuarios: Array<any> = new Array<any>();

  elementToUpload = null;

  usuario = new UsuarioModel();


  constructor(
    private fb: FormBuilder,
    public scriptGL: ScriptsGlobalService,
    private CatalogoService: CatalogoService,
    //private feriasService: FeriasService,
    private capacitacionesService: CapacitacionesService,
    private eventosService: EventosService,
    private usuariosService: UsersService,
    private proyectosService: ProyectosService,
    //private solicitudeService: SolicitudesService,
    private minutasService: MinutasService,
    public dialog: MatDialog,
    public appC: AppComponent,
    private awService: AdministracionWebService,
    private coreAuth: CoreAuthService,
    private taskservice : TasksService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.breakpoint = this.scriptGL.getOnResize();
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.isCharge = true;
    this.formulario = this.fb.group({
      id: [],
      folio: [{value: '', disabled: true}],
      asunto: ['', Validators.required],
      objetivo: ['', Validators.required],
      codigoPostal: [''],
      estado: [null],
      municipio: [null],
      ciudad: [''],
      sede: ['', Validators.required],
      tipoMinuta: ['', Validators.required],
      fecha: ['', Validators.required],
      temas: [new Array<CatalogoModel>(), Validators.required],
      //claseMinuta: ['', Validators.required],
      //idClase: ['', Validators.required],
      participanteSedecop: [[], Validators.required],
      participanteExternos: [[], Validators.required],
      puntosTratados: ['', Validators.required],
      proyectos: [null],
      createdAt: [''],
      updatedAt: [''],
    });
    this.getCatalogos();
    this.getProjectos();
    this.formulario.controls['estado'].valueChanges.subscribe(value => {
      if (value) {
        if (value.id) {
          this.getMunicipios(value.id);
        }
      }
    });

    this.obtenertareas();
    this.obtenerArchivos();

  }

  obtenertareas(){
    this.formulario.controls['id'].valueChanges.subscribe(id => {
      if (id) {
        this.taskservice.gettaskByminuta(id).subscribe(data => {
          if (data) {
            this.minutaTareas = data;
          }
        }, error => {
          this.snackBar.open('Error.', 'Entendido', {duration : 3000 });
        });
      }
    });
  }

  obtenerArchivos(){
    this.formulario.controls['id'].valueChanges.subscribe(id => {
      if (id) {
        this.minutasService.getarchivosByMinuta(id).subscribe(dataarchivo => {
          if (dataarchivo) {
            this.minutaArchivo = dataarchivo;
          }
        }, error => {
          this.snackBar.open('Error.', 'Entendido', {duration : 3000 });
        });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.formUpdate.currentValue) {
      this.formUpdate.participanteSedecop = [];
      this.formUpdate.participanteExternos = [];
      let ultimoID = 0;
      this.formUpdate.minutaUsuarios.forEach(element => {
        let esInstitucion: boolean = false;
        if( ultimoID != element.id ){
          ultimoID = element.id;
          element.perfiles.forEach(perfil => {
            if( perfil.tipo == "institución" ){
              esInstitucion = true;
            }
          });
          if ( esInstitucion ){
            this.participantesSedecop.push(element);
          }else{
            this.participantesExternos.push(element);
          }
        }
        //this.idsUsuarios[element.id] = element.id;

        if( esInstitucion ){
          this.participantesPrevSedecop.push(element);
          this.formUpdate.participanteSedecop.push(element);
        }else{
          this.participantesPrevExternos.push(element);
          this.formUpdate.participanteExternos.push(element);
        }
      });

      //this.tareas = this.minutaTareas;
      //this.archivos = this.formUpdate.minutaArchivos;
      this.formUpdate.temas = [];
      this.formUpdate.minutaTemas.forEach(element => {
        this.idsTemas[element.id] = element.id;
        this.temasPrev.push(element);
        this.formUpdate.temas.push(element);
      });

      this.formulario.patchValue(this.formUpdate);
      this.dataSource = new MatTableDataSource(this.archivos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isCharge = true;
      this.isUpdate = true;
      this.getTareas();
      this.getUsuario(this.coreAuth.getUserSessionData().idUsuario);
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

  async getCatalogos() {

    await this.CatalogoService.getCatalogos('estados').subscribe(data => {
      this.estados = data;
      //this.estados.sort((a, b) => (a.estado > b.estado) ? 1 : -1);
      this.estados.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    });

    await this.CatalogoService.getAllByTipoCatalogo('TIPO_MINUTA').subscribe(data => {
      this.tiposMinutas = data;
    });

    await this.CatalogoService.getAllByTipoCatalogo('CLASE_MINUTA').subscribe(data => {
      this.clasesMinutas = data;
    });

    await this.CatalogoService.getAllByTipoCatalogo('TEMA_MINUTA').subscribe(data => {
      this.temas = data;
    });

    //await this.usuariosService.pageByPerfilUsuario(1).subscribe(data => {

    await this.usuariosService.pageByPerfilUsuario(0).subscribe(data => {
      let ultimoID: number = 0;
      data.forEach(element => {
        let esInstitucion: boolean = false;
        if( ultimoID != element.id ){
          ultimoID = element.id;
          element.perfiles.forEach(perfil => {
            if( perfil.tipo == "institución" ){
              esInstitucion = true;
            }
          });
          if ( esInstitucion ){
            this.participantesSedecop.push(element);
          }else{
            this.participantesExternos.push(element);
          }
        }
      });

    });
  }

  async getMunicipios(id: number) {
    await this.CatalogoService.getCatalogosId('municipiosEstado', id).subscribe(data => {
      this.municipios = data;
      //this.municipios.sort((a, b) => (a.municipio > b.municipio) ? 1 : -1);
      this.municipios.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    });
  }

  async getProjectos() {
    await this.proyectosService.getPages(null,0).subscribe(data => {
      this.proyectosVigentes = data.dataset;
      this.proyectosVigentes.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    });
  }

  async getUsuario(id: number){
    await this.usuariosService.findById(id).subscribe(usuario => {
      this.usuario = usuario;
    });
  }

  async getTareas(){
    this.minutasService.findById(this.formUpdate.id).subscribe(data => {
      this.tareas = data.tareas;
    });
  }

  openNewTareaModal(){
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '80%',
      data: {
        minuta: this.formUpdate,
        task: {
          usuarioId: this.usuario
        }
      },
    }).afterClosed().subscribe(resp=>{
      this.obtenertareas();
    });
  }
  openOptionsTareasModal(tarea: TasksModel){
    const dialogRef = this.dialog.open(ModalOpcionesTareasMinutaComponent, {
      width: '80%',
      data: {
        minuta: this.formUpdate,
        task: tarea,
      },
    }).afterClosed().subscribe(resp=>{
      this.obtenertareas();
    });
  }

  descargarpdf(nombre: string){
    this.minutasService.getPdfUrl(nombre).subscribe(data => {
      if (data) {
       this.openPdf(data);
      }
    }, error => {
      this.snackBar.open('Error.', 'Entendido', {duration : 3000 });
    });
  }

  private openPdf(data: Blob) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
  }




  subirarchivo(file : any) {
    console.log("Llgue")

      let idUserString = localStorage.getItem('session');
      let idUser: number | null = idUserString ? parseInt(idUserString, 10) : null;

      this.formulario.controls['id'].valueChanges.subscribe(id => {
        this.minutasService.crearMinutaArchivo(file, id, idUser).subscribe(data => {
          if (data) {
            this.snackBar.open('Subido Correctamente.', 'Entendido', { duration: 3000 });
          }
        }, error => {
          this.snackBar.open('Error.', 'Entendido', { duration: 3000 });
        });
      });

  }


}
