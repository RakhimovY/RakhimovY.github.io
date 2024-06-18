import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { mainRoutingModule } from './main.routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(mainRoutingModule),
    TranslateModule,
    RouterOutlet,
  ],
})
export class MainModule {}
