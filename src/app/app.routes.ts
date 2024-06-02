import { Routes } from '@angular/router';
import { ERouting } from './shared/enums/routing.enum';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/authorization/authorization.module').then(
        (m) => m.AuthorizationModule,
      ),
  },
  {
    path: ERouting.AUTH,
    loadChildren: () =>
      import('./modules/authorization/authorization.module').then(
        (m) => m.AuthorizationModule,
      ),
  },
];
