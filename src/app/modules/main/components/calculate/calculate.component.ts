import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-calculate',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './calculate.component.html',
  styleUrl: './calculate.component.scss',
})
export class CalculateComponent implements OnInit {
  rateControl = new FormControl('0', [Validators.max(100), Validators.min(0)]);
  isDecrementBtnDisabled$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  isIncrementBtnDisabled$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  ngOnInit(): void {
    this.rateControl.valueChanges
      .pipe(
        tap((value) => {
          if (value !== undefined && value !== null) {
            +value <= 0
              ? this.isDecrementBtnDisabled$.next(true)
              : this.isDecrementBtnDisabled$.next(false);

            +value >= 100
              ? this.isIncrementBtnDisabled$.next(true)
              : this.isIncrementBtnDisabled$.next(false);
          } else {
            this.rateControl.setValue('0');
          }
        }),
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

  onIncrement() {
    if (this.rateControl.value) {
      this.rateControl.setValue((+this.rateControl.value + 1).toString());
    } else {
      this.rateControl.setValue('0');
    }
  }

  onDecrement() {
    if (this.rateControl.value) {
      this.rateControl.setValue((+this.rateControl.value - 1).toString());
    } else {
      this.rateControl.setValue('0');
    }
  }
}
