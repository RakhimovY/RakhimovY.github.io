import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthorizationComponent } from './components/authorization/authorization.component';

export const authorizationRoutingModule: Routes = [
  {
    path: '',
    component: AuthorizationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(authorizationRoutingModule)],
  exports: [RouterModule],
})
export class AuthorizationRoutingModule {}
