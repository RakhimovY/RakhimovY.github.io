import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonButtonComponent } from '../common-button/common-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, TranslateModule, CommonButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
