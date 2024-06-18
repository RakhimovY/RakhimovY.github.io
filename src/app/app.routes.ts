import { Routes } from '@angular/router';
import { ERouting } from './shared/enums/routing.enum';

export const routes: Routes = [
  { path: '', redirectTo: ERouting.MAIN, pathMatch: 'full' },
  {
    path: ERouting.MAIN,
    loadChildren: () =>
      import('./modules/main/main.module').then((m) => m.MainModule),
  },
  {
    path: ERouting.AUTH,
    loadChildren: () =>
      import('./modules/authorization/authorization.module').then(
        (m) => m.AuthorizationModule
      ),
  },
];
