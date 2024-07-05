import {Component, Input} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {NgxMaskDirective} from "ngx-mask";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-input-password-reset',
  standalone: true,
  imports: [
    TranslateModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './input-password-reset.component.html',
  styleUrl: './input-password-reset.component.scss'
})
export class InputPasswordResetComponent {
  @Input() passwordResendFormControl!: FormControl;
}
