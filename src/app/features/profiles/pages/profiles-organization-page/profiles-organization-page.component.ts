import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { Alerts } from 'src/app/core/utils/alerts';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profiles-organization-page',
  templateUrl: './profiles-organization-page.component.html',
  styleUrls: ['./profiles-organization-page.component.css']
})
export class ProfilesOrganizationPageComponent implements OnInit {

  helpsSettings: any = {
    'module_name': 'Organigrama general de perfiles',
    'description': 'Módulo encargado de presentar la estructura de perfiles dentro de la plataforma',
    'details': [
      { 'detail': 'Volver (<span class="material-symbols-outlined">arrow_back</span>)', 'description': 'Volver a perfiles ' }
    ]
  };

  nodes: any = [];

  constructor(
    private bottomSheet: MatBottomSheet,
    private profileService: ProfileService,
    private alerts: Alerts
  ) { }

  ngOnInit() {
    this.getOrganizationChart();
  }

  async getOrganizationChart(){
    await this.profileService.getOrganizationChart().subscribe((response) => {
      this.nodes = [];
      this.nodes.push(response);
    });
  }

  showHelpSection(): void {
    this.bottomSheet.open(HelpBottomSheetComponent, { data: this.helpsSettings });
  }

}
