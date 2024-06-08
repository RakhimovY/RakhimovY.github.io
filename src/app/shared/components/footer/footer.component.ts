import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonButtonComponent } from '../common-button/common-button.component';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, CommonButtonComponent, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
