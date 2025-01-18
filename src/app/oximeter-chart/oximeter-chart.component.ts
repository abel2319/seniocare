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

  public lineChartType: ChartType = 'line';

  private database = inject(Database); // Remplacez par votre méthode d'injection

  chart: any;

  constructor() {}

  ngOnInit(): void {
    this.fetchOximeterData();
  }

  private fetchOximeterData(): void {
    const oximeterRef = ref(this.database, 'Oximeter');

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

    });
    
  }

  private updateChart(bpm: number, ir: number, timestamp: string): void {
    const labels = this.lineChartData.labels as string[];
    console.log(`BPM: ${bpm}, IR: ${ir}, Timestamp: ${timestamp}`);
    // Ajouter les nouvelles données
    this.lineChartData.datasets[0].data.push(bpm);
    this.lineChartData.datasets[1].data.push(ir/1000);
    labels.push(timestamp);

    console.log(this.lineChartData);
    // Limiter à une heure de données (par exemple, 60 points)
    if (labels.length > 60) {
      labels.shift(); // Supprimer l'ancien horodatage
      this.lineChartData.datasets[0].data.shift(); // Supprimer l'ancienne valeur BPM
      this.lineChartData.datasets[1].data.shift(); // Supprimer l'ancienne valeur IR
    }
  }
}
