import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';

export const authorizationRoutingModule: Routes = [
  {
    path: '',
    component: SignInComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(authorizationRoutingModule)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {}
