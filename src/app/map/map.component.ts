import { Component, OnInit, inject } from '@angular/core';
import { Database, onValue, ref } from '@angular/fire/database';

import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  private map!: L.Map;
  private marker!: L.Marker;

  latitude: number = 50.955425;
  longitude: number = 1.868342333;
  heure: string = "";
  private database = inject(Database);

  constructor() {}

  ngOnInit(): void {
    this.initMap();
    this.fetchGPSData();
  }

  private fetchGPSData(): void {
      const oximeterRef = ref(this.database, 'GPS');
  
      onValue(oximeterRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          this.latitude = data['LAT_DEGREE'];
          this.longitude = data['LON_DEGREE'];
          this.heure = data["UTC(Heure)"]; // Heure actuelle
  
          // Mettre à jour les données du graphique
          this.updateMarker(this.latitude, this.longitude);
        }
  
      });
      
    }

  private initMap(): void {

    const mapLayer = 'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}';
    const googleSat = L.tileLayer(mapLayer, {
      detectRetina: true,
      maxZoom: 22,
      maxNativeZoom: 19,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    });

    this.map = L.map('map', {
      center: L.latLng(this.latitude, this.longitude),
      zoom: 16,
      minZoom: 2,
      maxZoom: 22,
      layers: [googleSat]
    })
    // Ajouter un marqueur initial
    this.marker = L.marker([this.latitude, this.longitude]).addTo(this.map);
  }

  // Fonction pour mettre à jour la position en temps réel
  public updateMarker(lat: number, lon: number): void {
    this.marker.setLatLng([lat, lon]);
    this.map.setView([lat, lon], this.map.getZoom());
  }
}
