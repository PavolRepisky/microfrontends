import { Routes } from '@angular/router';
import { UserManagementHostComponent } from './user-management-host.component';
import { LoadMicrofrontendGuard } from '../../guards/load-microfrontend.guard';

export const USER_MANAGEMENT_ROUTES: Routes = [
  {
    path: '**',
    canActivate: [LoadMicrofrontendGuard],
    component: UserManagementHostComponent,
    data: {
      bundleUrl: 'http://localhost:4201/bundle.js',
    },
  },
];
