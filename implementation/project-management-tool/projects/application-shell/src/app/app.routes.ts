import { Routes } from '@angular/router';
import { PlaceholderComponent } from './placeholder/placeholder.component';

export const routes: Routes = [
  { path: '', component: PlaceholderComponent },
  { path: 'projects', component: PlaceholderComponent },
  { path: 'tasks', component: PlaceholderComponent },
  { path: 'users', component: PlaceholderComponent },
];
