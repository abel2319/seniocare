import { Component, OnInit, inject } from '@angular/core';
import { ChartConfiguration, ChartType, registerables, Chart } from 'chart.js';
import { Database, onValue, ref } from '@angular/fire/database';


Chart.register(...registerables);
@Component({
  selector: 'app-oximeter-chart',
  templateUrl: './oximeter-chart.component.html',
  styleUrls: ['./oximeter-chart.component.css'],
})
export class OximeterChartComponent implements OnInit {
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [], // Données du BPM
        label: 'BPM (Battements par minute)',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: 'rgba(75,192,192,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        data: [], // Données de l'IR
        label: 'IR (Indice de réflexion)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255,99,132,1)',
        fill: false,
      },
      {
        data: [], // Données de l'IR
        label: 'Température (°C)',
        backgroundColor: 'rgba(99, 255, 125, 0.2)',
        borderColor: 'rgba(99, 255, 99, 1)',
        pointBackgroundColor: 'rgba(99, 255, 99,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(99, 255, 99,1)',
        fill: false,
      },
    ],
    labels: [], // Horodatages
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0,
        max: 200, // Ajustez selon vos données
      },
    },
  };

  temp: number = 0;
  bpm: number = 0;
  ir: number = 0;

  public lineChartType: ChartType = 'line';

  private database = inject(Database); // Remplacez par votre méthode d'injection

  chart: any;

  constructor() {}

  ngOnInit(): void {
    this.fetchOximeterData();
  }

  private fetchOximeterData(): void {
    const documentNames = ['Accelerometre','Oximeter'];
    documentNames.forEach((docName) => {
      const dataRef = ref(this.database, docName);
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          if (docName === 'Accelerometre') {
            this.temp = data.temp;
          } else {
            this.bpm = data.BPM;
            this.ir = data.IR;
          }
          const timestamp = new Date().toLocaleTimeString(); // Heure actuelle
          
          if (this.chart) {
            this.chart.destroy();
          }

          this.updateChart(this.bpm, this.ir, timestamp, this.temp);
          this.chart = new Chart('oximeter-chart', {
            type: this.lineChartType,
            data: this.lineChartData,
            options: this.lineChartOptions,
          });
        }
      });
      
    });

    /*const oximeterRef = ref(this.database, 'Oximeter');

    onValue(oximeterRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const bpm = data.BPM; // BPM du capteur
        const ir = data.IR;  // IR du capteur
        const timestamp = new Date().toLocaleTimeString(); // Heure actuelle
        
        if (this.chart) {
          this.chart.destroy();
        }

        // Mettre à jour les données du graphique
        this.updateChart(bpm, ir, timestamp);
        this.chart = new Chart('oximeter-chart', {
          type: this.lineChartType,
          data: this.lineChartData,
          options: this.lineChartOptions,
        });
      }

    });*/
    
  }

  private updateChart(bpm: number, ir: number, timestamp: string, temp: number): void {
    const labels = this.lineChartData.labels as string[];
    // Ajouter les nouvelles données
    this.lineChartData.datasets[0].data.push(bpm);
    this.lineChartData.datasets[1].data.push(ir/10);
    this.lineChartData.datasets[2].data.push(temp);
    labels.push(timestamp);

    // Limiter à une heure de données (par exemple, 60 points)
    if (labels.length > 30) {
      labels.shift(); // Supprimer l'ancien horodatage
      this.lineChartData.datasets[0].data.shift(); // Supprimer l'ancienne valeur BPM
      this.lineChartData.datasets[1].data.shift(); // Supprimer l'ancienne valeur IR
      this.lineChartData.datasets[2].data.shift();
    }
  }
}
