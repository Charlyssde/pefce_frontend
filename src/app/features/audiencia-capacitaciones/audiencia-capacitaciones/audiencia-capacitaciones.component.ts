import { Component, OnInit } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { CapacitacionesService } from '../../capacitaciones/service/capacitaciones.service';

@Component({
  selector: 'app-audiencia-capacitaciones',
  templateUrl: './audiencia-capacitaciones.component.html',
  styleUrls: ['./audiencia-capacitaciones.component.css']
})
export class AudienciaCapacitacionesComponent implements OnInit {
  cols = 4;
  rowHeight = "1:1.5";
  capacitacionesRegistradas = [];
  capacitacionesNoRegistradas = [];
  isCharge = false;

  constructor(
    private service: CapacitacionesService,
    public scriptGL: ScriptsGlobalService
  ) { }

  ngOnInit() {
    this.cols = (window.innerWidth <= 450) ? 1 : ((window.innerWidth <= 850) ? 2 : ((window.innerWidth <= 1450) ? 3 : 4));
    this.rowHeight = (window.innerWidth <= 450) ? "1:1.7" : ((window.innerWidth <= 850) ? "1:2" : ((window.innerWidth <= 1450) ? "1:1.2" : "1:1.8"));
    this.getRegistradas();
    this.getNoRegistradas();
  }

  onResize(event) {
    this.cols = (window.innerWidth <= 450) ? 1 : ((window.innerWidth <= 850) ? 2 : ((window.innerWidth <= 1450) ? 3 : 4));
    this.rowHeight = (window.innerWidth <= 450) ? "1:1.7" : ((window.innerWidth <= 850) ? "1:2" : ((window.innerWidth <= 1450) ? "1:1.2" : "1:1.8"));
  }

  async getRegistradas() {
    await this.service.findCapacitacionesRegistradas(this.scriptGL.getUserSessionData().idUsuario).subscribe(data => {
      
      if (data.length > 0) {
        this.capacitacionesRegistradas = data;
        this.isCharge = true;
      } else {
        this.capacitacionesRegistradas = [];
        this.isCharge = true;
      }
    }, error => {
      this.scriptGL.printErrorSnackBar(error);
      this.isCharge = true;
    });
  }

  async getNoRegistradas() {

    await this.service.findCapacitacionesNoRegistradas(this.scriptGL.getUserSessionData().idUsuario).subscribe(data => {
      if (data.length > 0) {
        this.capacitacionesNoRegistradas = data;
        this.isCharge = true;
      } else {
        this.capacitacionesNoRegistradas = [];
        this.isCharge = true;
      }
    }, error => {
      this.scriptGL.printErrorSnackBar(error);
      this.isCharge = true;
    });
  }

  reload(){
    this.getRegistradas();
    this.getNoRegistradas();
  }
}
