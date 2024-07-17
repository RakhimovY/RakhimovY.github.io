import { Component } from '@angular/core';
import { LayoutComponent } from '../core/layout/layout.component';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos';
import { initializeApp } from 'firebase/app';
import { TranslateService } from '@ngx-translate/core';
import { AuthorizationController } from './modules/authorization/controllers/authorization.controller';
import { EAuthority } from './modules/authorization/enums/authority.enum';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'project_Cargo';

  constructor(
    private translateService: TranslateService,
    private authorizationController: AuthorizationController,
    private cookieService: CookieService,
  ) {
    const firebaseConfig = {
      apiKey: 'AIzaSyD3VpY2va5QLmdd0Gnc4KvVyoTYILoK1_E',
      authDomain: 'silkcargo-a3389.firebaseapp.com',
      projectId: 'silkcargo-a3389',
      storageBucket: 'silkcargo-a3389.appspot.com',
      messagingSenderId: '477152129300',
      appId: '1:477152129300:web:1b73ff94be3f2ed5631201',
      measurementId: 'G-XC90DJ4721',
    };
    initializeApp(firebaseConfig);

    const localLanguage = localStorage.getItem('language');
    const role = this.cookieService.get('role');

    if (localLanguage) {
      this.translateService.setDefaultLang(localLanguage);
    } else {
      localStorage.setItem('language', 'ru');
      this.translateService.setDefaultLang('ru');
    }

    if (role === EAuthority.ROLE_USER) {
      this.authorizationController.isUser.set(true);
      this.authorizationController.isAdmin.set(false);
    } else if (role === EAuthority.ROLE_ADMIN) {
      this.authorizationController.isUser.set(false);
      this.authorizationController.isAdmin.set(true);
    } else {
      this.authorizationController.isUser.set(false);
      this.authorizationController.isAdmin.set(false);
    }

    window.innerWidth <= 900
      ? this.authorizationController.isMobile.set(true)
      : this.authorizationController.isMobile.set(false);

    AOS.init();
  }
}
