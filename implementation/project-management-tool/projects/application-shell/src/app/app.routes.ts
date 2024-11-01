import { Routes } from '@angular/router';
import { MfePlaceholderComponent } from './components/mfe-placeholder/mfe-placeholder.component';

export const routes: Routes = [
  { path: '', component: MfePlaceholderComponent },
  { path: 'projects', component: MfePlaceholderComponent },
  { path: 'tasks', component: MfePlaceholderComponent },
  { path: 'users', component: MfePlaceholderComponent },
];
