import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonButtonComponent } from '../common-button/common-button.component';
import { Router, RouterLink } from '@angular/router';
import { ERouting } from '../../enums/routing.enum';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, CommonButtonComponent, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  constructor(private router: Router) {}

  navToAuth() {
    this.router.navigate([ERouting.AUTH]);
  }
}
