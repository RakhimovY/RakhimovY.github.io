import { Component } from '@angular/core';
import { CalculateComponent } from './components/calculate/calculate.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CalculateComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
