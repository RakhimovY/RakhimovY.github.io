import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

interface City {
  name: string;
  code: string;
}

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
  cities: City[] | undefined;

  selectedCity!: FormControl<City | null>;

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];

    console.log(document.getElementsByClassName('p-dropdown-trigger-icon'));
  }
}
