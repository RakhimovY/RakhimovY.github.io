import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { cabinetRoutingModule } from './cabinet.routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(cabinetRoutingModule),
    TranslateModule,
    RouterOutlet,
  ],
})
export class CabinetModule {}
