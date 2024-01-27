import { Component, Input, OnInit } from '@angular/core';
import { ModuloModel } from 'src/app/core/models/capacitaciones/modulo-model';

@Component({
  selector: 'app-progreso-modulo',
  templateUrl: './progreso-modulo.component.html',
  styleUrls: ['./progreso-modulo.component.css']
})
export class ProgresoModuloComponent implements OnInit {

  @Input() modulo: ModuloModel;

  constructor() { }

  ngOnInit() {
  }

}
