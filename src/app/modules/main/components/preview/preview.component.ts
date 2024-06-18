import { Component } from '@angular/core';
import { CommonButtonComponent } from '../../../../shared/components/common-button/common-button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonButtonComponent, TranslateModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent {}
