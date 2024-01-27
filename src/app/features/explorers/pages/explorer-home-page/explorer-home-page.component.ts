import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { AutodiagnosticoComponent } from 'src/app/shared/components/modals/autodiagnostico/autodiagnostico.component';


@Component({
  selector: 'app-explorer-home-page',
  templateUrl: './explorer-home-page.component.html',
  styleUrls: ['./explorer-home-page.component.css']
})
export class ExplorerHomePageComponent implements OnInit {

  helpsSettings: any = {
    'module_name': 'Exploradores',
    'description': 'Vista principal de los exploradores disponibles en la plataforma',
    'details': [
      { 'detail': 'Explorador de capacitaciones', 'description': 'Despliega el explorador de capacitaciones disponibles para el usuario.' },
      { 'detail': 'Explorador de eventos', 'description': 'Despliega el explorador de eventos disponibles para el usuario.' },
      { 'detail': 'Explorador de empresas', 'description': 'Despliega el explorador de empresas disponibles para el usuario.' },
    ]
  };

  constructor(
    private bottomSheet: MatBottomSheet,    
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  showHelpSection(): void {
    this.bottomSheet.open(HelpBottomSheetComponent, { data: this.helpsSettings });
  }

  openNewAutodiagnosticoModal(autodiagnostico?: any){
    const dialogRef = this.dialog.open(AutodiagnosticoComponent, {
      width: '80%',
      data: {autodiagnostico: autodiagnostico}
      })/*.afterClosed().subscribe((result) => {
        this.pages();
      })*/; 
  }

}
