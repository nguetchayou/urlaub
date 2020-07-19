import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'urlaub';
  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyC91EPxffewjoI4Cn1tN14D9mR2yL9FWjw',
      authDomain: 'urlaubsantraege-f1ec2.firebaseapp.com',
      databaseURL: 'https://urlaubsantraege-f1ec2.firebaseio.com',
      projectId: 'urlaubsantraege-f1ec2',
      storageBucket: 'urlaubsantraege-f1ec2.appspot.com',
      messagingSenderId: '641401611532',
      appId: '1:641401611532:web:f734e6e56cd990a4c75529'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
