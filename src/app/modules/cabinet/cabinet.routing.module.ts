import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CabinetComponent } from './cabinet.component';

export const cabinetRoutingModule: Routes = [
  {
    path: '',
    children: [{ path: '', component: CabinetComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cabinetRoutingModule)],
  exports: [RouterModule],
})
export class CabinetRoutingModule {}
