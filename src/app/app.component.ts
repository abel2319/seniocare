//export class AppComponent {
//  title = 'seniocare';
//}

import { Component, Input, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { Database, onValue, ref, set } from '@angular/fire/database';


interface Valeur {
  data: any;
  documentName: string; // Propriété ajoutée ici
}
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  @Input() public name: string = '';
  public valeurs: Valeur[] = [];
 
  private database = inject(Database);
 
  constructor() {}
 

  ngOnInit() {
    // Liste des noms de documents à récupérer
    const documentNames = ['Accelerometre', 'Button', 'GPS', 'Oximeter', 'document'];

    documentNames.forEach((docName) => {
      const dataRef = ref(this.database, docName);
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        //console.log(`Data from ${docName}:`, data);
        if (data) {
          this.valeurs.push({
            documentName: docName,
            data: data,
          });
          
          /*const newValues = Object.values(data).map((val: any) => ({
            value: val.value,
            documentName: docName, // Inclut le nom du document pour identifier la source
          }));
          this.valeurs = [...this.valeurs, ...newValues]; // Fusionne les nouvelles valeurs*/
        }
      });
      
    });
  }


  /*ngOnInit() {
    const dataRef = ref(this.database, 'Accelerometre');
    onValue(dataRef, (snapshot) => {
      
      const data = snapshot.val();
      console.log(data);
      if (data) {
        this.valeurs = Object.values(data).map((val: any) => ({
          value: val.value,
        }));
        console.log(this.valeurs);
      }
    });
  }*/
}
