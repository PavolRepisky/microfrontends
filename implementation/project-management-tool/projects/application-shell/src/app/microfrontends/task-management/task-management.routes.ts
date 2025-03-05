import { Routes } from '@angular/router';
import { LoadMicrofrontendGuard } from '../../guards/load-microfrontend.guard';
import { TaskManagementHostComponent } from './task-management-host.component';

export const TASK_MANAGEMENT_ROUTES: Routes = [
  {
    path: '**',
    canActivate: [LoadMicrofrontendGuard],
    component: TaskManagementHostComponent,
    data: {
      bundleUrl: 'http://localhost:4202/bundle.js',
      compact: false,
    },
  },
];
