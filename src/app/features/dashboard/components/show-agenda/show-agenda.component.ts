import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CalendarOptions, ICalendar } from 'datebook';

@Component({
  selector: 'app-show-agenda',
  templateUrl: './show-agenda.component.html',
  styleUrls: ['./show-agenda.component.css']
})
export class ShowAgendaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ShowAgendaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  export(){
    const config: CalendarOptions = {
      title: this.data.nombre,      
      description: this.data.descripcion,
      start: new Date(this.data.fechahora),
      end: new Date(this.data.fechahorafin),      
    }
    const icalendar = new ICalendar(config);
    icalendar.download();
  }
}
