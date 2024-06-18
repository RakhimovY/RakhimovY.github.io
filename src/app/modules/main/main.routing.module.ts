import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';

export const mainRoutingModule: Routes = [
  {
    path: '',
    children: [{ path: '', component: MainComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutingModule)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
