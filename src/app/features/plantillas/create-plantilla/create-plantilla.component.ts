import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { PlantillaModel } from 'src/app/core/models/plantilla/plantilla-model';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { UsersService } from 'src/app/features/users/services/users.service';
import { FormPlantillaComponent } from '../form-plantilla/form-plantilla.component';
import { PlantillasService } from '../service/plantillas.service';

@Component({
  selector: 'app-create-plantilla',
  templateUrl: './create-plantilla.component.html',
  styleUrls: ['./create-plantilla.component.css']
})
export class CreatePlantillaComponent implements OnInit {
  saltRounds = 10;
  dataSave: PlantillaModel;
  usuario: UsuarioModel;
  
  @Output() goPage: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(FormPlantillaComponent) form: FormPlantillaComponent;
  
  constructor(
    private service: PlantillasService,
    private usuarioService: UsersService,
    public scriptGL: ScriptsGlobalService
  ) { }

  ngOnInit() {
    this.usuarioService.findById(this.scriptGL.getUserSessionData().idUsuario).subscribe(data => {
      this.usuario = data;
    });
  }

  goToPage() {
    this.goPage.emit(true);
  }

  async save() {
    if (this.form.validForm()) {
      this.dataSave = this.form.form.getRawValue();           
      this.dataSave.usuarioId = this.usuario;     
      this.dataSave.createdAt = new Date();

      await this.service.create(this.dataSave).subscribe(data => {
        if (data) {
          this.scriptGL.printGuardarSnackBar(data);
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



