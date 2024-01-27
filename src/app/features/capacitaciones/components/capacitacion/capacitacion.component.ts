import { Component, OnInit } from '@angular/core';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';

@Component({
  selector: 'app-capacitacion',
  templateUrl: './capacitacion.component.html',
  styleUrls: ['./capacitacion.component.css']
})
export class CapacitacionComponent implements OnInit {
  showPage = true;
  showCreate = false;
  showUpdate = false;
  idForm: number = 0;

  constructor(
    public scriptGL: ScriptsGlobalService
  ) { }

  ngOnInit() {
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
