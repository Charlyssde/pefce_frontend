import { CapacitacionesService } from '../../service/capacitaciones.service';
import { CapacitacionModel } from 'src/app/core/models/capacitaciones/capacitacion-model';
import { Component, OnInit } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { ActivatedRoute } from '@angular/router';
import { ModulosService } from '../../modulos/service/modulos.service';
import { ModuloModel } from 'src/app/core/models/capacitaciones/modulo-model';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {
  showPage = true;
  showCreate = false;
  showUpdate = false;
  idForm: number = 0;
  id_capacitacion: number = 0;
  capacitacion: CapacitacionModel = new CapacitacionModel;
  id_modulo: number = 0;
  modulo: ModuloModel = new ModuloModel;

  constructor(
    public scriptGL: ScriptsGlobalService,
    private route: ActivatedRoute,
    private serviceCapacitaciones: CapacitacionesService,
    private serviceModulos: ModulosService,
  ) { }

  ngOnInit() {
    this.id_capacitacion = parseInt(this.route.snapshot.paramMap.get('id_capacitacion'));
    this.id_modulo = parseInt(this.route.snapshot.paramMap.get('id_modulo'));
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
