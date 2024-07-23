import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ERouting } from '../../shared/enums/routing.enum';
import { StorageComponent } from './pages/storage/storage.component';
import { AdminComponent } from './admin.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ManageComponent } from './pages/manage/manage.component';

export const adminRoutingModule: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: ERouting.STORAGE, pathMatch: 'full' },
      { path: ERouting.STORAGE, component: StorageComponent },
      { path: ERouting.CLIENTS, component: ClientsComponent },
      { path: ERouting.MANAGE, component: ManageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutingModule)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
