import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { AdminStorageService } from '../../services/admin-storage.service';

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './inputs.component.html',
  styleUrl: './inputs.component.scss',
})
export class InputsComponent {
  storageSearchFormControl = new FormControl(null);

  constructor(private adminStorageService: AdminStorageService) {
    this.storageSearchFormControl.valueChanges
      .pipe(
        debounceTime(400),
        tap((value) => {
          this.adminStorageService.allOrdersParams.update((prevValue) => {
            return { ...prevValue, searchByTrack: value ?? undefined };
          });
        }),
      )
      .subscribe();
  }
}
