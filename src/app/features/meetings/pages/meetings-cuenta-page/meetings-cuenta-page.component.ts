import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { MeetingsModel } from './../../../../core/models/meetings/meetings-model';
import { MeetingCuentasModel } from 'src/app/core/models/meetings/meeting_cuentas-model';
import { MeetingsService } from './../../services/meetings.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ZoomMeetingTypes } from 'src/app/core/constants/zoom-meeting-types';

@Component({
  selector: 'app-meetings-cuenta-page',
  templateUrl: './meetings-cuenta-page.component.html',
  styleUrls: ['./meetings-cuenta-page.component.css']
})
export class MeetingsCuentaPageComponent implements OnInit {

  displayedColumns: string[] = ["agenda","topic","type","duration","pre_schedule","start_time","acciones"];
  dataSource = null;
  isCharge = false;

  idCuentaMeeting: number = null;
  cuenta: MeetingCuentasModel = new MeetingCuentasModel();
  meetings: MeetingsModel[] = [];

  tiposMeeting: any = new ZoomMeetingTypes().dataset;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public activatedRouter:ActivatedRoute,
    public lib: ScriptsGlobalService,
    private meetingsService: MeetingsService
  ) { }

  ngOnInit() {
    this.idCuentaMeeting = parseInt(this.activatedRouter.snapshot.paramMap.get('idCuentaMeeting'));
    this.getMeetingsAccount();
  }

  async getMeetingsAccount(){
    await this.meetingsService.getMeetingsCuenta(this.idCuentaMeeting).subscribe( (response) => {
      if(response){
        this.cuenta = response.cuenta;
        this.meetings = response.meetings
        if(this.meetings.length > 0){
          this.dataSource = new MatTableDataSource(this.meetings);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isCharge = true;
        }
        else{
          this.dataSource = null;
        this.isCharge = true;
        this.lib.printSnackbar(2, 1, 'meetings', null, 5, false, null, null);
        }
      }
    }, (error) => {

    });
  }

  setMatDataSource(data: any){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getTipoMeeting(type:number){
    let tipoObject = this.tiposMeeting.find(t => t.key === type );
    return tipoObject.value;
  }

}
