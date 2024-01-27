import { Component, Input, OnInit } from '@angular/core';
import { ModuloModel } from 'src/app/core/models/capacitaciones/modulo-model';

@Component({
  selector: 'app-aula-progreso',
  templateUrl: './aula-progreso.component.html',
  styleUrls: ['./aula-progreso.component.css']
})
export class AulaProgresoComponent implements OnInit {

  @Input() modulos: Array<ModuloModel>;

  constructor() { }

  ngOnInit() {
  }

}
