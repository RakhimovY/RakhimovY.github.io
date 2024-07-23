import { AfterViewInit, Component, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonButtonComponent } from '../common-button/common-button.component';
import { ERouting } from '../../enums/routing.enum';
import { navToElement } from '../../functions/nav.functions';
import { AuthorizationController } from '../../../modules/authorization/controllers/authorization.controller';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { IPDropdown } from '../../types/pDropdown.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule,
    CommonButtonComponent,
    DropdownModule,
    ReactiveFormsModule,
    NgClass,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit {
  isAuthorized = computed(() => this.authorizationController.isAuthorized());
  isMobile = computed(() => this.authorizationController.isMobile());
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

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private authorizationController: AuthorizationController,
  ) {}

  ngAfterViewInit(): void {
    const header = document.getElementsByTagName('header')[0] as HTMLElement;
    this.navbarLinks = document.querySelector('.navbar-links') as HTMLElement;
    this.burgerCheckbox = document.querySelector(
      '.burger-checkbox',
    ) as HTMLInputElement;

    if (this.isMobile()) {
      this.navbarLinks.style.paddingTop = header.offsetHeight + 16 + 'px';
    }

    this.setLanguage(localStorage.getItem('language'));

    this.languageFormControl.valueChanges
      .pipe(
        tap((language) => {
          this.translateService.setDefaultLang(language?.code ?? 'ru');
          localStorage.setItem('language', language?.code ?? 'ru');
        }),
      )
      .subscribe();
  }

  navToSection(tag: string) {
    if (tag === 'authorization') {
      this.router.navigate([ERouting.AUTH]).then((_) => {
        setTimeout(() => {
          navToElement(tag);
          this.burgerCheckbox.click();
        }, 100);
      });
      return;
    }

    if (tag === 'cabinet') {
      this.router.navigate([ERouting.CABINET]).then((_) => {
        setTimeout(() => {
          navToElement(tag);
          this.burgerCheckbox.click();
        }, 100);
      });
      return;
    }
    if (tag === 'admin') {
      this.router.navigate([ERouting.ADMIN]).then((_) => {
        setTimeout(() => {
          navToElement(tag);
          this.burgerCheckbox.click();
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

  mobileNavbarToggle() {
    this.navbarLinks.classList.toggle('open');
  }

  closeMobileNavbar() {
    if (this.navbarLinks.classList.contains('open')) {
      this.burgerCheckbox.click();
    }
  }

  setLanguage(code: string | null) {
    this.languageFormControl.setValue(
      this.languageList.filter((language: IPDropdown) => {
        return language.code === code;
      })[0],
    );
  }

  logout() {
    this.authorizationController.logOut();
  }
}
