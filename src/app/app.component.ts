//export class AppComponent {
//  title = 'seniocare';
//}

import { Component, Input, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { Database, onValue, ref, set } from '@angular/fire/database';
 
interface Valeur {
  value: string;
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
    const dataRef = ref(this.database, 'Accelerometre');
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.valeurs = Object.values(data).map((val: any) => ({
          value: val.value,
        }));
 
        console.log(this.valeurs);
      }
    });
  }
}
