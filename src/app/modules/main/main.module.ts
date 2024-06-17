import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { mainRoutingModule } from './main.routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(mainRoutingModule)],
})
export class MainModule {}
