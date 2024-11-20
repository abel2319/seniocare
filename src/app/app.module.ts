import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"seniocare-929e1","appId":"1:214779188663:web:290b16809070aa036cc432","databaseURL":"https://seniocare-929e1-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"seniocare-929e1.firebasestorage.app","apiKey":"AIzaSyDGemiGPI0diWb2AMU9JHujPOMvfPXraL4","authDomain":"seniocare-929e1.firebaseapp.com","messagingSenderId":"214779188663"})),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
