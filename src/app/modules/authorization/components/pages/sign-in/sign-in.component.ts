import { Component } from '@angular/core';
import { CommonButtonComponent } from '../../../../../shared/components/common-button/common-button.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonButtonComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  passwordHidden: boolean = true;

  showOrHidePass() {
    const passwordInput: HTMLInputElement | null = document.getElementById(
      'passwordInput',
    ) as HTMLInputElement;
    if (passwordInput?.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
    this.passwordHidden = !this.passwordHidden;
  }
}
