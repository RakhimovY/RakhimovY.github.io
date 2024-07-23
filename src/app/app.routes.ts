import { Routes } from '@angular/router';
import { ERouting } from './shared/enums/routing.enum';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: ERouting.CABINET, pathMatch: 'full' },
  {
    path: ERouting.MAIN,
    loadChildren: () =>
      import('./modules/main/main.module').then((m) => m.MainModule),
  },
  {
    path: ERouting.AUTH,
    loadChildren: () =>
      import('./modules/authorization/authorization.module').then(
        (m) => m.AuthorizationModule,
      ),
    canActivate: [authGuard],
  },
  {
    path: ERouting.CABINET,
    loadChildren: () =>
      import('./modules/cabinet/cabinet.module').then((m) => m.CabinetModule),
    canActivate: [authGuard],
  },
  {
    path: ERouting.ADMIN,
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [authGuard],
  },
];
