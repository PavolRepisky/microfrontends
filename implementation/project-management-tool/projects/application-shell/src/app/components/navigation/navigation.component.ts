import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavItem } from '../../types/nav-item.type';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, NgClass, RouterLink, TranslateModule],
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
