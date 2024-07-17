import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { IPDropdown } from '../../types/pDropdown.interface';

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
export class InputCityComponent implements OnInit {
  cities: IPDropdown[] | undefined;

  @Input() cityFormControl!: FormControl;

  ngOnInit() {
    this.cities = [
      { name: 'Астана', code: '01' },
      { name: 'Алматы', code: '02' },
    ];
  }
}
