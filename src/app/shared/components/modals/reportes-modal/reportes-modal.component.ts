import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GraficoModel } from "src/app/core/models/reportes/grafico.model";
import { Chart, registerables } from 'chart.js';

//Chart.register(...registerables);

@Component({
  selector: 'app-reportes-modal',
  templateUrl: './reportes-modal.component.html',
  styleUrls: ['./reportes-modal.component.css']
})

export class ReportesModalComponent implements OnInit {
  
  title = 'Ng7ChartJs By DotNet Techy';
  LineChart=[];
  BarChart=[];
  PieChart: any = [];
  titulo: string;

  @Input() ListSexo: any[];
  @Input() ListMunicipio: any[];
  @Input() ListSector: any[];
  public Total=0;
  public MaxHeight= 160;
  
  chart: any = [];
  
  constructor( @Inject(MAT_DIALOG_DATA) public data: any ) {
    this.titulo = data.titulo;
    this.ListSexo = data.datos[0] ;
    this.ListMunicipio = data.datos[1] ;
    this.ListSector = data.datos[2] ;
  }

  ngOnInit(): void {
    this.MontarGrafico();
  }

  MontarGrafico(){

    this.PieChart = new Chart('sexoChart', {
      type: 'pie',
      data: {
      labels: [ "Hombre", "Mujer" ],
      datasets: [{
         label: 'Sexo',
         data: this.ListSexo,
         backgroundColor: [
             'rgb(255, 99, 132)',
             'rgba(54, 162, 235)',
         ]
      }]
      }, 
   
      options: {  
        title:{
          text:"Número de empresarios por sexo",
          display:true
        },
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          labels: {
            render: 'percentage',
            fontColor: ['green', 'white', 'red'],
            precision: 2
          }
        }        
      }
    });

    this.BarChart = new Chart('sectorChart', {
      type: 'horizontalBar',
      data: {
        labels: this.ListSector[0],
        datasets: [
          {
            label: "Solicitudes recibidas por sector",
            data: this.ListSector[1]
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Empresarios con solicitudes por Sector acorde al SCIAN'
        }
      }
    });      

    this.BarChart = new Chart('municipioChart', {
      type: 'horizontalBar',
      data: {
        labels: this.ListMunicipio[0],
        datasets: [
          {
            label: "Solicitudes recibidas por municipio",
            data: this.ListMunicipio[1]
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Empresarios con solicitudes por municipio'
        }
      }
    });      


  }

}
