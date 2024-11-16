import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsModalComponent } from '../settings-modal/settings-modal.component';
import { NavItem } from '../../models/nav-item.type';
import { User } from '../../../../../user-management/src/app/models/user.type';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    NgClass,
    RouterLink,
    TranslateModule,
    SettingsModalComponent,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  title = 'Microfrontends';

  @Output() onOpenSettings = new EventEmitter<boolean>();

  navItems: NavItem[] = [
    {
      icon: 'bi-house-door',
      label: 'navigation.dashboard',
      active: true,
      url: '/',
    },
    {
      icon: 'bi-briefcase',
      label: 'navigation.projects',
      active: false,
      url: '/projects',
    },
    {
      icon: 'bi-check-lg',
      label: 'navigation.tasks',
      active: false,
      url: '/tasks',
    },
    {
      icon: 'bi-people',
      label: 'navigation.users',
      active: false,
      url: '/users',
    },
  ];
}