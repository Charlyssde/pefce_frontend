import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';

@Component({
  selector: 'app-page-system',
  templateUrl: './page-system.component.html',
  styleUrls: ['./page-system.component.css']
})
export class PageSystemComponent implements OnInit {

  encuestas: any;
  dces: any;
  dains: any;
  subins: any;
  cpdits: any;

  formulario: FormGroup;
  breakpoint: number;

  constructor(
    private fb: FormBuilder,
    public scriptGL: ScriptsGlobalService
  ) { }

  ngOnInit() {
    this.breakpoint = this.scriptGL.getOnResize();
    this.formulario = this.fb.group({
      subinresponsable: [null],
      dceresponsable: [null],
      dainresponsable: [null],
      cpditresponsable: [null],
      capacitacion: [null],
      evento:[null],
      solicitud:[null],
      proyecto: [null],
      createdAt: [null],
      updatedAt: [null],
    });
  }

  onResize(event) {
    this.breakpoint = this.scriptGL.getOnResize();
  }  

}
