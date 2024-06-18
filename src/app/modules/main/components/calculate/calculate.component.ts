import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-calculate',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './calculate.component.html',
  styleUrl: './calculate.component.scss',
})
export class CalculateComponent implements OnInit {
  rateControl = new FormControl('', [Validators.max(100), Validators.min(0)]);

  ngOnInit(): void {
    this.rateControl.valueChanges
      .pipe(
        tap((value) => {
          if (typeof value === 'number') {
            value > 100
              ? this.rateControl.setValue('100')
              : value < 0
              ? this.rateControl.setValue('0')
              : null;
          }
        })
      )
      .subscribe();
  }
}
