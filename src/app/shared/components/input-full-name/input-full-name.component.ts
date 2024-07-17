import {Component, Input} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-input-full-name',
  standalone: true,
  imports: [
    TranslateModule,
    ReactiveFormsModule
  ],
  templateUrl: './input-full-name.component.html',
  styleUrl: './input-full-name.component.scss'
})
export class InputFullNameComponent {
  @Input() fullNameFormControl!: FormControl;

}


