import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TasksModel } from 'src/app/core/models/tareas/tasks-model';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.css']
})
export class ShowTaskComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ShowTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TasksModel,
  ) { }

  ngOnInit() {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

}
