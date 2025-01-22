import { Component, OnInit, inject } from '@angular/core';
import { Database, onValue, ref } from '@angular/fire/database';

@Component({
  selector: 'app-bouton',
  templateUrl: './bouton.component.html',
  styleUrl: './bouton.component.css'
})
export class BoutonComponent implements OnInit {
  constructor() {}
  boutonData: any;

  private database = inject(Database);
  ngOnInit(): void {
    const buttonRef = ref(this.database, 'Button');
    onValue(buttonRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.boutonData = data===1 ? true : false;
        console.log('Données du bouton:', data);
      }
    });
  }

}
