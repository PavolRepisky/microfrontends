import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./microfrontends/task-management/task-management.routes').then(
        (m) => m.TASK_MANAGEMENT_ROUTES
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./microfrontends/user-management/user-management.routes').then(
        (m) => m.USER_MANAGEMENT_ROUTES
      ),
  },
];
