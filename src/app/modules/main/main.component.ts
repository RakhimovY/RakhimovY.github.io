import { Component } from '@angular/core';
import { CalculateComponent } from './components/calculate/calculate.component';
import { PreviewComponent } from './components/preview/preview.component';
import { AdvantageComponent } from './components/advantage/advantage.component';
import { FAQComponent } from './components/faq/faq.component';
import { AnimatedContainerComponent } from './components/animated-container/animated-container.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CalculateComponent,
    PreviewComponent,
    AdvantageComponent,
    FAQComponent,
    AnimatedContainerComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
