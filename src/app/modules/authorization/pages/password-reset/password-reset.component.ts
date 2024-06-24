import { Component } from '@angular/core';
import { CommonButtonComponent } from '../../../../shared/components/common-button/common-button.component';
import { InputEmailComponent } from '../../components/input-email/input-email.component';
import { InputPasswordComponent } from '../../components/input-password/input-password.component';
import { TranslateModule } from '@ngx-translate/core';
import { InputPasswordResetComponent } from '../../components/input-password-reset/input-password-reset.component';
import { FormControl, Validators } from '@angular/forms';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  timer,
  withLatestFrom,
} from 'rxjs';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { SubscriptionAccumulator } from '../../../../core/helpers/SubscriptionAccumulator';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    CommonButtonComponent,
    InputEmailComponent,
    InputPasswordComponent,
    TranslateModule,
    InputPasswordResetComponent,
    DatePipe,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss',
})
export class PasswordResetComponent extends SubscriptionAccumulator {
  passwordResendFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(6),
  ]);

  countDownMilliseconds$: BehaviorSubject<number> = new BehaviorSubject(0);
  onCodeError: string | null = null;
  ableToResendOTP$: Observable<boolean> = this.countDownMilliseconds$.pipe(
    map((countDown) => countDown <= 0),
  );

  resendOTP() {
    this.countDownMilliseconds$.next(120000);
    this.passwordResendFormControl.reset();
    this.onCodeError = null;
    this.passwordResendFormControl.enable();
  }

  sendOTP() {
    this.countDownMilliseconds$.next(120000);
    this.passwordResendFormControl.reset();
    this.passwordResendFormControl.enable();
    this.startTimer();
  }

  private startTimer(): void {
    this.addSubscriber(
      timer(0, 1000)
        .pipe(
          withLatestFrom(this.countDownMilliseconds$),
          filter(([, countDown]) => countDown > 0),
          map(([, countDown]) =>
            this.countDownMilliseconds$.next(countDown - 1000),
          ),
        )
        .subscribe(),
    );
  }
}
