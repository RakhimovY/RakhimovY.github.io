import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { IPDropdown } from '../../types/pDropdown.interface';
import { cities } from '../../../core/helpers/common';

@Component({
  selector: 'app-input-city',
  standalone: true,
  imports: [
    TranslateModule,
    DropdownModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  templateUrl: './input-city.component.html',
  styleUrl: './input-city.component.scss',
})
export class InputCityComponent {
  cities: IPDropdown[] = cities;

  @Input() cityFormControl!: FormControl;
}
