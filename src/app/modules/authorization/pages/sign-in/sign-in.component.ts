import {Component} from '@angular/core';
import {CommonButtonComponent} from '../../../../shared/components/common-button/common-button.component';
import {InputEmailComponent} from "../../components/input-email/input-email.component";
import {TranslateModule} from "@ngx-translate/core";
import {InputPasswordComponent} from "../../components/input-password/input-password.component";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonButtonComponent, InputEmailComponent, TranslateModule, InputPasswordComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {

}
