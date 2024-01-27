import { AppComponent } from 'src/app/app.component';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { EventoModel } from 'src/app/core/models/eventos/eventos-model';
import { FormEventoComponent } from '../form-evento/form-evento.component';
import { EventosService } from '../service/eventos.service';

const bcrypt = require('bcryptjs');

@Component({
  selector: 'app-update-evento',
  templateUrl: './update-evento.component.html',
  styleUrls: ['./update-evento.component.css']
})
export class UpdateEventoComponent implements OnInit, AfterViewInit {

  saltRounds = 10;
  dataSave: EventoModel;
  formUpdate: EventoModel;
  canUpdate = true;

  @Input() idForm: number;
  @Output() goPage: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(FormEventoComponent) form: FormEventoComponent;

  constructor(
    private service: EventosService,
    public scriptGL: ScriptsGlobalService,
    public appC: AppComponent,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.idForm && this.idForm != 0) {
      this.service.findById(this.idForm).subscribe(data => {
        if (data) {
          let
            date1 = new Date(data.fechaInicio),
            date2 = new Date(data.fechaFin);
            console.log( date1.toISOString().split('T')[0] + " " + date1.toLocaleTimeString('es-MX') );
            data.fechaInicio = date1.toISOString().split('T')[0] + " " + date1.toLocaleTimeString('es-MX');
            data.fechaFin = date2.toISOString().split('T')[0] + " " + date2.toLocaleTimeString('es-MX');
            
            if( data.archivo.length > 0 ) {
              data.archivoimagen = data.archivo[0];
            }
          this.formUpdate = data;

        } else {
          this.scriptGL.printSnackbar(15, 1, null, 'Error al consultar los datos, intentelo de nuevo', 2, false, null, null);
          this.canUpdate = false;
        }
      }, error => {
        this.scriptGL.printErrorSnackBar(error);
        this.canUpdate = false;
      });
      this.cdRef.detectChanges();
    }
  }


  goToPage() {
    this.idForm = 0;
    this.goPage.emit(true);
  }

  async save() {
    this.appC.cargando = true;
    if (this.form.validForm() && this.form.validaFechasInicioYFin()) {
      this.dataSave = this.form.formulario.getRawValue();
      console.log(this.dataSave );
      this.dataSave.fechaInicio = new Date(this.dataSave.fechaInicio.toString()+":00");
      this.dataSave.fechaFin = new Date(this.dataSave.fechaFin.toString()+":00");
      this.dataSave.activo = true;
      this.dataSave.createdAt = new Date();

      const formData = new FormData();

      formData.append("datosimagen", JSON.stringify( this.dataSave.archivoimagen ) );
      
      if( this.dataSave.archivo ){
        formData.append("archivoimagen", this.dataSave.archivo );
      }else{
        formData.append("archivoimagen", null);
      }

      this.dataSave.archivoimagen = null;
      this.dataSave.archivo = null;
      
      formData.append("evento", JSON.stringify(this.dataSave));      

      await this.service.update(formData).subscribe(data => {
        if (data) {
          this.scriptGL.printGuardarSnackBar(data);
          this.goToPage();
          this.appC.cargando = false;
        } else {
          this.scriptGL.printSnackbar(1, null, null, "Error", 5, false, null, null);
          this.appC.cargando = false;
        }
      }, (error) => {

        this.scriptGL.printSnackbar(1, null, null, "Error catch", 5, false, null, error);
        this.appC.cargando = false;
      });
    } else {
      this.scriptGL.printSnackbar(15, 1, null, 'Favor de llenar todos los campos requeridos.', 2, false, null, null);
      this.appC.cargando = false;
    }
  }

}
