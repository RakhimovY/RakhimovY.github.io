import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-calculate',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AsyncPipe, TranslateModule],
  templateUrl: './calculate.component.html',
  styleUrl: './calculate.component.scss',
})
export class CalculateComponent implements OnInit {
  rateControl = new FormControl('0', [Validators.max(100), Validators.min(0)]);
  isDecrementBtnDisabled$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  isIncrementBtnDisabled$: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  advantages = [
    {
      id: 1,
      title: '5 лет',
      subtitle: 'На рынке',
    },
    {
      id: 2,
      title: '123546',
      subtitle: 'Доставленных товаров',
    },
    {
      id: 3,
      title: '200',
      subtitle: 'Довольных клиентов',
    },
  ];

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
