import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatPaginator, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { EmpresaModel } from 'src/app/core/models/empresas/empresa.model';

export interface AccessRequestHistory {
  estatus: Boolean;
  mensaje: String;
  createdAt: Date;
}

@Component({
  selector: 'app-enterprise-access-request-history',
  templateUrl: './enterprise-access-request-history.component.html',
  styleUrls: ['./enterprise-access-request-history.component.css']
})
export class EnterpriseAccessRequestHistoryComponent implements OnInit {
  displayedColumns: string[] = ['status', 'createdAt', 'message'];
  dataSource = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  enterprise: EmpresaModel;

  constructor(
    public dialogRef: MatDialogRef<EnterpriseAccessRequestHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.enterprise = data.enterprise;
   }

  ngOnInit() {
    let accessRequestsHistory = JSON.parse(JSON.stringify((this.enterprise.solicitudesAcceso).sort((a,b) => a.id - b.id)));
    this.dataSource = new MatTableDataSource<AccessRequestHistory>(accessRequestsHistory);
    this.dataSource.paginator = this.paginator;
  }

  cleanHtmlTags(message: String){
    if ((message===null) || (message===''))
        return false;
    else
        message = message.toString();
    return message.replace( /(<([^>]+)>)/ig, '');
  }
}
