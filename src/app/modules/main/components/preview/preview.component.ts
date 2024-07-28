import { Component } from '@angular/core';
import { CommonButtonComponent } from '../../../../shared/components/common-button/common-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { callToNumberFunction } from '../../../../shared/functions/callToNumber.function';
import { navToElement } from '../../../../shared/functions/nav.functions';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonButtonComponent, TranslateModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent {
  protected readonly callToNumberFunction = callToNumberFunction;

  navToCalc() {
    navToElement('calculate');
  }
}
