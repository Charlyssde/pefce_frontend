import { ModuloModel } from 'src/app/core/models/capacitaciones/modulo-model';
import { CapacitacionModel } from 'src/app/core/models/capacitaciones/capacitacion-model';
import { ModulosService } from 'src/app/features/capacitaciones/modulos/service/modulos.service';
import { CapacitacionesService } from 'src/app/features/capacitaciones/service/capacitaciones.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { TemaModel } from 'src/app/core/models/capacitaciones/tema-model';
import { TemasService } from 'src/app/features/capacitaciones/temas/service/temas.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {
  showPage = true;
  showCreate = false;
  showUpdate = false;
  idForm: number = 0;
  id_capacitacion: number = 0;
  capacitacion: CapacitacionModel = new CapacitacionModel;
  id_modulo: number = 0;
  modulo: ModuloModel = new ModuloModel;
  id_tema: number = 0;
  tema: TemaModel = new TemaModel;

  constructor(
    public scriptGL: ScriptsGlobalService,
    private route: ActivatedRoute,
    private serviceCapacitaciones: CapacitacionesService,
    private serviceModulos: ModulosService,
    private serviceTemas: TemasService,
  ) { }

  ngOnInit() {
    this.id_capacitacion = parseInt(this.route.snapshot.paramMap.get('id_capacitacion'));
    this.id_modulo = parseInt(this.route.snapshot.paramMap.get('id_modulo'));
    this.id_tema = parseInt(this.route.snapshot.paramMap.get('id_tema'));
  }

  ngAfterViewInit() {
    if (this.id_capacitacion && this.id_capacitacion != 0) {
      this.serviceCapacitaciones.findById(this.id_capacitacion).subscribe(data => {
        if (data) {
          this.capacitacion = data;
        } else {
          this.scriptGL.printSnackbar(15, 1, null, 'Error al consultar los datos, intentelo de nuevo', 2, false, null, null);
        }
      }, error => {
        this.scriptGL.printErrorSnackBar(error);
      });
    }

    if (this.id_modulo && this.id_modulo != 0) {
      this.serviceModulos.findById(this.id_modulo).subscribe(data => {
        if (data) {
          this.modulo = data;
        } else {
          this.scriptGL.printSnackbar(15, 1, null, 'Error al consultar los datos, intentelo de nuevo', 2, false, null, null);
        }
      }, error => {
        this.scriptGL.printErrorSnackBar(error);
      });
    }

    if (this.id_tema && this.id_tema != 0) {
      this.serviceTemas.findById(this.id_tema).subscribe(data => {
        if (data) {
          this.tema = data;
        } else {
          this.scriptGL.printSnackbar(15, 1, null, 'Error al consultar los datos, intentelo de nuevo', 2, false, null, null);
        }
      }, error => {
        this.scriptGL.printErrorSnackBar(error);
      });
    }
  }

  goToCreate() {
    this.showPage = false;
    this.showUpdate = false;
    this.showCreate = true;
  }

  goToPage() {
    this.showCreate = false;
    this.showUpdate = false;
    this.showPage = true;
  }

  goToUpdate(event) {
    if (event) {
      this.showCreate = false;
      this.showPage = false;
      this.showUpdate = true;
      this.idForm = event.id;
    }
  }
}
