import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { authorizationRoutingModule } from './authorization.routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(authorizationRoutingModule),
    TranslateModule,
    RouterOutlet,
  ],
})
export class AuthorizationModule {}
