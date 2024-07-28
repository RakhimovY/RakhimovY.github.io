import { Component, OnInit } from '@angular/core';
import { CommonButtonComponent } from '../../../../shared/components/common-button/common-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, Validators } from '@angular/forms';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  tap,
  timer,
  withLatestFrom,
} from 'rxjs';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { SubscriptionAccumulator } from '../../../../core/helpers/SubscriptionAccumulator';
import { InputEmailComponent } from '../../../../shared/components/input-email/input-email.component';
import { InputPasswordComponent } from '../../../../shared/components/input-password/input-password.component';
import { InputPasswordResetComponent } from '../../../../shared/components/input-password-reset/input-password-reset.component';
import { AuthorizationController } from '../../controllers/authorization.controller';
import { IChangePass } from '../../interfaces/change-pass.interface';

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
export class PasswordResetComponent
  extends SubscriptionAccumulator
  implements OnInit
{
  emailFormControl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.minLength(8),
    Validators.email,
  ]);
  codeFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(6),
  ]);
  newPassFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(8),
  ]);
  newPassCheckFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(8),
  ]);
  countDownMilliseconds$: BehaviorSubject<number> = new BehaviorSubject(0);
  onCodeError: string | null = null;
  ableToResendOTP$: Observable<boolean> = this.countDownMilliseconds$.pipe(
    map((countDown) => countDown <= 0),
  );

  constructor(private authController: AuthorizationController) {
    super();
    this.codeFormControl.disable();
    this.newPassFormControl.disable();
    this.newPassCheckFormControl.disable();
  }

  ngOnInit(): void {
    this.addSubscriber(
      this.authController.isCodeSent$
        .pipe(
          filter((value) => value),
          tap((value) => {
            this.updateFormControlStatus();
          }),
        )
        .subscribe(),
    );
  }

  updateFormControlStatus() {
    this.codeFormControl.reset();
    this.newPassFormControl.reset();
    this.newPassCheckFormControl.reset();
    this.onCodeError = null;
    this.codeFormControl.enable();
    this.newPassFormControl.enable();
    this.newPassCheckFormControl.enable();
    this.countDownMilliseconds$.next(120000);
  }

  resendOTP() {
    this.authController.sendOTPCode(this.emailFormControl.value);
  }

  sendOTP() {
    this.authController.sendOTPCode(this.emailFormControl.value);
    this.startTimer();
  }

  changePass() {
    const params: IChangePass = {
      email: this.emailFormControl.value,
      newPassword: this.newPassFormControl.value,
      сonfirmPassword: this.newPassCheckFormControl.value,
      code: this.codeFormControl.value,
    };
    this.authController.changePass(params);
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
