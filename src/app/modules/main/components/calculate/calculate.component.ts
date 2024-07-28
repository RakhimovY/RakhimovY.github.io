import { Component, computed, OnInit } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, tap } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-calculate',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    TranslateModule,
    CurrencyPipe,
  ],
  templateUrl: './calculate.component.html',
  styleUrl: './calculate.component.scss',
})
export class CalculateComponent implements OnInit {
  rateControl: FormControl<number | null> = new FormControl(0, [
    Validators.max(100),
    Validators.min(0),
  ]);
  isDecrementBtnDisabled$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  isIncrementBtnDisabled$: BehaviorSubject<boolean> = new BehaviorSubject(
    false,
  );
  advantages = [
    {
      id: 1,
      title: '5 лет',
      subtitle: 'На рынке',
    },
    {
      id: 2,
      title: '123546+',
      subtitle: 'Доставленных товаров',
    },
    {
      id: 3,
      title: '200+',
      subtitle: 'Довольных клиентов',
    },
  ];

  wightAmount = computed(() => this.mainService.wightAmount());

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    const rateControlInput = document.getElementById(
      'rateControlInput',
    ) as HTMLInputElement;
    rateControlInput.addEventListener('input', () => {
      if (
        rateControlInput.value.length > 1 &&
        rateControlInput.value.toString().startsWith('0')
      ) {
        rateControlInput.value = rateControlInput.value.slice(1);
      }
    });

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
            this.rateControl.setValue(0);
          }
        }),
        tap((value) => {
          value !== null && value > 100
            ? this.rateControl.setValue(100)
            : value !== null && value < 0
              ? this.rateControl.setValue(0)
              : null;
        }),
      )
      .subscribe();

    this.mainService.getWightAmount();
  }

  onIncrement() {
    this.rateControl.value !== null
      ? this.rateControl.setValue(this.rateControl.value + 1)
      : this.rateControl.setValue(0);
  }

  onDecrement() {
    this.rateControl.value !== null
      ? this.rateControl.setValue(this.rateControl.value - 1)
      : this.rateControl.setValue(0);
  }
}
