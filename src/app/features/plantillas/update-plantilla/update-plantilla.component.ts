import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { PlantillaModel } from 'src/app/core/models/plantilla/plantilla-model';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { UsersService } from 'src/app/features/users/services/users.service';
import { FormPlantillaComponent } from '../form-plantilla/form-plantilla.component';
import { PlantillasService } from '../service/plantillas.service';

@Component({
  selector: 'app-update-plantilla',
  templateUrl: './update-plantilla.component.html',
  styleUrls: ['./update-plantilla.component.css']
})
export class UpdatePlantillaComponent implements OnInit {


  saltRounds = 10;
  dataSave: PlantillaModel;
  formUpdate: PlantillaModel;
  usuario: UsuarioModel;
  canUpdate = true;

  @Input() idForm: number;  
  @Output() goPage: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(FormPlantillaComponent) form: FormPlantillaComponent;

  constructor(
    private service: PlantillasService,
    private usuarioService: UsersService,
    public scriptGL: ScriptsGlobalService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.usuarioService.findById(this.scriptGL.getUserSessionData().idUsuario).subscribe(data => {
      this.usuario = data;
    });
  }

  ngAfterViewInit() {
    if (this.idForm && this.idForm != 0) {
      this.service.pageById(this.idForm).subscribe(data => {
        if (data) {
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
    if (this.form.validForm()) {
      this.dataSave = this.form.form.getRawValue();      
      //this.dataSave.updatedAt = new Date();
      await this.service.update(this.dataSave).subscribe(data => {
        if (data) {
          this.scriptGL.printEditarSnackBar(data);
          this.goToPage();
        } else {
          this.scriptGL.printSnackbar(1, null, null, null, 5, false, null, null);
        }
      }, error => {
        this.scriptGL.printErrorSnackBar(error);
      });
    } else {
      this.scriptGL.printSnackbar(15, 1, null, 'Favor de llenar todos los campos requeridos.', 2, false, null, null);
    }
  }

}



