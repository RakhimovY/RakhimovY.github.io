import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { ERouting } from '../../../../shared/enums/routing.enum';

@Component({
  selector: 'app-input-password',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.scss',
})
export class InputPasswordComponent {
  @Input() isSignUp: boolean = false;
  passwordHidden: boolean = true;
  protected readonly ERouting = ERouting;

  showOrHidePass() {
    const passwordInput: HTMLInputElement | null = document.getElementById(
      'passwordInput'
    ) as HTMLInputElement;
    if (passwordInput?.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
    this.passwordHidden = !this.passwordHidden;
  }
}
