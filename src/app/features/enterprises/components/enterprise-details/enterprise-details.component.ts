import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-enterprise-details',
  templateUrl: './enterprise-details.component.html',
  styleUrls: ['./enterprise-details.component.css']
})
export class EnterpriseDetailsComponent implements OnInit {

  enterprise = null;
  constructor(
    public dialogRef: MatDialogRef<EnterpriseDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.enterprise = data.enterprise
  }

  ngOnInit() {
  }

}
