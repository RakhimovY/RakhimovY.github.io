import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-email',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule],
  templateUrl: './input-email.component.html',
  styleUrl: './input-email.component.scss',
})
export class InputEmailComponent {
  @Input() emailFormControl!: FormControl;
}
