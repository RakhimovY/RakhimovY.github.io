import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { AdminClientsService } from '../../services/admin-clients.service';

@Component({
  selector: 'app-clients-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './clients-filter.component.html',
  styleUrl: './clients-filter.component.scss',
})
export class ClientsFilterComponent {
  clientSearchFormControl = new FormControl(null);

  constructor(private adminClientsService: AdminClientsService) {
    this.clientSearchFormControl.valueChanges
      .pipe(
        debounceTime(400),
        tap((value) => {
          this.adminClientsService.clientsParams.update((prevValue) => {
            return { ...prevValue, searchByTrack: value ?? undefined };
          });
        }),
      )
      .subscribe();
  }
}
