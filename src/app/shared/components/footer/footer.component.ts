import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonButtonComponent } from '../common-button/common-button.component';
import { Router, RouterLink } from '@angular/router';
import { ERouting } from '../../enums/routing.enum';
import { navToElement } from '../../functions/nav-functions';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, CommonButtonComponent, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(private router: Router) {}

  navToSection(tag: string) {
    this.router.url.includes(ERouting.MAIN)
      ? navToElement(tag)
      : this.router.navigate([ERouting.MAIN]).then((_) => {
          setTimeout(() => {
            navToElement(tag);
          }, 100);
        });
  }
}
