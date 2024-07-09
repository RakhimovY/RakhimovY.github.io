import { Component } from '@angular/core';
import { LayoutComponent } from '../core/layout/layout.component';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'project_Cargo';

  constructor() {
    AOS.init();
  }
}
