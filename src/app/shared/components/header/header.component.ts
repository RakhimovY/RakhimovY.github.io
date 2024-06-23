import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonButtonComponent } from '../common-button/common-button.component';
import { ERouting } from '../../enums/routing.enum';
import { navToElement } from '../../functions/nav-functions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, TranslateModule, CommonButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
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
