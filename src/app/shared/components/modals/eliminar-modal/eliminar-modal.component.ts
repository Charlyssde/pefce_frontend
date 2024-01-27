import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  id: number,
  etiqueta: string,
  nombre: string
}

@Component({
  selector: 'app-eliminar-modal',
  templateUrl: './eliminar-modal.component.html',
  styleUrls: ['./eliminar-modal.component.css']
})
export class EliminarModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(){
  }

}
