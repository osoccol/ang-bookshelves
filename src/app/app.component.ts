import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){
    var firebaseConfig = {
      apiKey: "AIzaSyCyNiLkqghWcRz9JUhDOHWCz9LhzrBEm-g",
      authDomain: "bookshelves-c4db8.firebaseapp.com",
      databaseURL: "https://bookshelves-c4db8.firebaseio.com",
      projectId: "bookshelves-c4db8",
      storageBucket: "gs://bookshelves-c4db8.appspot.com",
      messagingSenderId: "436280494376",
      appId: "1:436280494376:web:f16e3903177ccccd45681d"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
