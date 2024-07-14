import {AfterViewInit, Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {CommonButtonComponent} from '../common-button/common-button.component';
import {ERouting} from '../../enums/routing.enum';
import {navToElement} from '../../functions/nav-functions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, TranslateModule, CommonButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit {
  constructor(private router: Router) {
  }

  ngAfterViewInit(): void {
    const header = document.getElementsByTagName('header')[0] as HTMLElement;
    const navbarLinks = document.querySelector('.navbar-links') as HTMLElement;

    if (header.offsetWidth < 900) {
      navbarLinks.style.paddingTop = header.offsetHeight + 16 + 'px';
    }

  }

  navToSection(tag: string) {
    if (tag === 'authorization') {
      this.router.navigate([ERouting.AUTH]).then(_ => {
        setTimeout(() => {
          navToElement(tag);
        }, 100);
      })
      return
    }

    this.router.url.includes(ERouting.MAIN)
      ? navToElement(tag)
      : this.router.navigate([ERouting.MAIN]).then((_) => {
        setTimeout(() => {
          navToElement(tag);
        }, 100);
      });
  }

  showMobileNavbar() {
    const navbarLinks = document.querySelector('.navbar-links') as HTMLElement;
    navbarLinks.classList.toggle('open');
  }
}
