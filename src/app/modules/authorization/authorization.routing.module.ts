import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SignInComponent} from './pages/sign-in/sign-in.component';
import {ERouting} from '../../shared/enums/routing.enum';
import {PasswordResetComponent} from './pages/password-reset/password-reset.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';

export const authorizationRoutingModule: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: ERouting.SIGN_IN, pathMatch: 'full'},
      {path: ERouting.SIGN_IN, component: SignInComponent},
      {path: ERouting.PASSWORD_RESET, component: PasswordResetComponent},
      {
        path: ERouting.SIGN_UP,
        component: SignUpComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(authorizationRoutingModule)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {
}
