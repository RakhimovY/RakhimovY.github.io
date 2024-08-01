import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StorageComponent } from './pages/storage/storage.component';
import { AdminPageToggleComponent } from './components/admin-page-toggle/admin-page-toggle.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, StorageComponent, AdminPageToggleComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }
}
