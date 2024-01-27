import { NotificacionModel } from 'src/app/core/models/notificaciones/notificacion-model';
import { DashboardService } from './../../services/dashboard.service';

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-show-notification',
  templateUrl: './show-notification.component.html',
  styleUrls: ['./show-notification.component.css']
})
export class ShowNotificationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ShowNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NotificacionModel,
    public dashboardService: DashboardService
  ) { }

  ngOnInit() {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

}
