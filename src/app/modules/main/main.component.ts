import { AfterViewInit, Component } from '@angular/core';
import { CalculateComponent } from './components/calculate/calculate.component';
import { PreviewComponent } from './components/preview/preview.component';
import { AdvantageComponent } from './components/advantage/advantage.component';
import { FAQComponent } from './components/faq/faq.component';
import { AnimatedBoxComponent } from './components/animated-box/animated-box.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CalculateComponent,
    PreviewComponent,
    AdvantageComponent,
    FAQComponent,
    AnimatedBoxComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    document.getElementById('preview')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  }
}
