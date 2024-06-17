import { Component } from '@angular/core';
import { PreviewComponent } from './components/preview/preview.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [PreviewComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
