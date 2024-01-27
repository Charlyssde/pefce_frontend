import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { AulaService } from '../aula/service/aula.service';

@Component({
  selector: 'app-validar-constancia',
  templateUrl: './validar-constancia.component.html',
  styleUrls: ['./validar-constancia.component.css']
})
export class ValidarConstanciaComponent implements OnInit {
  token = '';
  valid = true;
  data: any = {};

  constructor(
    private aulaService: AulaService,
    private scriptGL: ScriptsGlobalService
  ) { }

  ngOnInit() {
    var temp = (window.location.pathname).split("/");    
    this.token = temp[temp.length-1];
    this.validarConstancia();
  }

  async validarConstancia(){
    await this.aulaService.validarConstancia(this.token).subscribe( data => {
      if (data) {
        this.data = data;
      }else{
        this.valid = false;
        this.scriptGL.printErrorSnackBar(data);
      }
    }, error => {
      this.valid = false;
      //this.scriptGL.printErrorSnackBar(error);
    });
  }

  printArea(key: String){
    switch (key) {
      case 'atraccionInversiones':
        return 'Atracción de inversiones';
      case 'comercioExterior':
        return 'Comercio Exterior';
      case 'proyectosEstrategicos':
        return 'Proyectos Estratégicos';
      default:
        return '';
    }
  }
}
