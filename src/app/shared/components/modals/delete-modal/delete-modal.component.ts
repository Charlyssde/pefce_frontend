import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteModalInterface } from 'src/app/shared/interfaces/modals/delete-modal.interface';

@Component({
  selector: 'shared-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  disableDelete: boolean = true;
  boton: string = '';

  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteModalInterface,
  ) {
    if(data.alerts == null){
      this.disableDelete = false;
    }
    if (data.autorizar) {
      this.boton = 'Si';
    }else{
      this.boton = 'Eliminar';
    }
  }

  ngOnInit() {
  }

  onChangeValidation(value){
    this.disableDelete = !value;
  }

}
