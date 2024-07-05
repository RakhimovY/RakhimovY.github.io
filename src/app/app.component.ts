import { Component } from '@angular/core';
import { LayoutComponent } from '../core/layout/layout.component';
import { RouterOutlet } from '@angular/router';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'project_Cargo';

  constructor() {
    AOS.init();

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: 'AIzaSyDb1Un73q6SO8diszmtxNEn9_n34eOFskg',
      authDomain: 'testcargo-6a0f5.firebaseapp.com',
      projectId: 'testcargo-6a0f5',
      storageBucket: 'testcargo-6a0f5.appspot.com',
      messagingSenderId: '533673152872',
      appId: '1:533673152872:web:1223bf73901f1ca72206dd',
      measurementId: 'G-Q095DSRM81',
    };

    // Initialize Firebase
    initializeApp(firebaseConfig);
  }
}
