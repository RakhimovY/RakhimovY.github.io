import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';

export const mainRoutingModule: Routes = [
  { path: '', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutingModule)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
