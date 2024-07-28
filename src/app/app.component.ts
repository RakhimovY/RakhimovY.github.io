import { Component } from '@angular/core';
import { LayoutComponent } from '../core/layout/layout.component';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos';
import { TranslateService } from '@ngx-translate/core';
import { AuthorizationController } from './modules/authorization/controllers/authorization.controller';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'SilkCargo';

  constructor(
    private translateService: TranslateService,
    private authorizationController: AuthorizationController,
    private cookieService: CookieService,
  ) {
    const localLanguage = localStorage.getItem('language');

    if (localLanguage) {
      this.translateService.setDefaultLang(localLanguage);
    } else {
      localStorage.setItem('language', 'ru');
      this.translateService.setDefaultLang('ru');
    }

    this.authorizationController.checkAuthStatus();

    window.innerWidth <= 900
      ? this.authorizationController.isMobile.set(true)
      : this.authorizationController.isMobile.set(false);

    AOS.init();
  }
}
