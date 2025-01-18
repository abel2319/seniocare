import { Component, OnInit, inject } from '@angular/core';// Import Firebase
import { Database, onValue, ref } from '@angular/fire/database';

@Component({
  selector: 'app-accelerometer',
  templateUrl: './accelerometer-data.component.html',
  styleUrls: ['./accelerometer-data.component.css']
})
export class AccelerometerComponent implements OnInit {
  accelerometerData: any;
  isFallDetected: boolean = false;
  threshold: number = 20; // Définir un seuil pour détecter une chute
  magnitude: number = 0;

  constructor() {}
  private database = inject(Database);
  ngOnInit(): void {
    // Récupérer les données en temps réel depuis Firebase
    this.fetchAccelerometerData();
  }

  private fetchAccelerometerData(): void {
      const accelerometerRef = ref(this.database, 'Accelerometre');
  
      onValue(accelerometerRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.accelerometerData = data;
          this.checkForFall(data.acc); 
        }
      });
    }

  checkForFall(acc: { x: number; y: number; z: number }): void {
    // Calculer la magnitude de l'accélération
    this.magnitude = Math.sqrt(acc.x ** 2 + acc.y ** 2 + acc.z ** 2);

    // Vérifier si la magnitude dépasse le seuil
    this.isFallDetected = this.magnitude > this.threshold;
  }
}
