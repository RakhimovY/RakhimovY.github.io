import { Component, computed } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonButtonComponent } from '../common-button/common-button.component';
import { Router, RouterLink } from '@angular/router';
import { ERouting } from '../../enums/routing.enum';
import { navToElement } from '../../functions/nav.functions';
import { AuthorizationController } from '../../../modules/authorization/controllers/authorization.controller';
import { IPDropdown } from '../../types/pDropdown.interface';
import { FormControl } from '@angular/forms';
import { openWhatsapp } from '../../functions/openWhatsapp.function';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, CommonButtonComponent, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  isAuthorized = computed(() => this.authorizationController.isAuthorized());
  isAdmin = computed(() => this.authorizationController.isAdmin());
  isUser = computed(() => this.authorizationController.isUser());
  navbarLinks!: HTMLElement;
  burgerCheckbox!: HTMLInputElement;
  languageFormControl: FormControl<IPDropdown | null> = new FormControl({
    name: 'Ru',
    code: 'ru',
  });
  languageList: IPDropdown[] = [
    { name: 'Ru', code: 'ru' },
    { name: 'Kk', code: 'kk' },
    { name: 'En', code: 'en' },
  ];
  protected readonly openWhatsapp = openWhatsapp;

  constructor(
    private router: Router,
    private authorizationController: AuthorizationController,
  ) {}

  navToSection(tag: string) {
    if (tag === 'authorization') {
      this.router.navigate([ERouting.AUTH]).then((_) => {
        setTimeout(() => {
          navToElement(tag);
          this.burgerCheckbox?.click();
        }, 100);
      });
      return;
    }

    if (tag === 'cabinet') {
      this.router.navigate([ERouting.CABINET]).then((_) => {
        setTimeout(() => {
          window.scrollTo(0, 0);
          this.burgerCheckbox?.click();
        }, 100);
      });
      return;
    }
    if (tag === 'admin') {
      this.router.navigate([ERouting.ADMIN]).then((_) => {
        setTimeout(() => {
          window.scrollTo(0, 0);
          this.burgerCheckbox?.click();
        }, 100);
      });
      return;
    }
    this.router.url.includes(ERouting.MAIN)
      ? (navToElement(tag), this.closeMobileNavbar())
      : this.router.navigate([ERouting.MAIN]).then((_) => {
          setTimeout(() => {
            navToElement(tag);
            this.closeMobileNavbar();
          }, 100);
        });
  }

  closeMobileNavbar() {
    if (this.navbarLinks?.classList?.contains('open')) {
      this.burgerCheckbox?.click();
    }
  }
}
