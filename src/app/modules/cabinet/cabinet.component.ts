import { Component } from '@angular/core';
import { InfoComponent } from './components/info/info.component';

@Component({
  selector: 'app-cabinet',
  standalone: true,
  imports: [InfoComponent],
  templateUrl: './cabinet.component.html',
  styleUrl: './cabinet.component.scss',
})
export class CabinetComponent {}
