import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskDirective } from 'ngx-mask';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-input-phone',
  standalone: true,
  imports: [
    TranslateModule,
    NgxMaskDirective,
    FormsModule,
    NgStyle,
    NgClass,
    ReactiveFormsModule,
  ],
  templateUrl: './input-phone.component.html',
  styleUrl: './input-phone.component.scss',
})
export class InputPhoneComponent {
  @Input() phoneFormControl!: FormControl;
}
