import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../src/app/theme.service';

interface NavItem {
  icon: string;
  label: string;
  url: string;
  active: boolean;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, NgClass, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  title = 'Microfrontends';
  theme: string;

  constructor(private themeService: ThemeService) {
    this.theme = this.themeService.getTheme();
  }

  navItems: NavItem[] = [
    { icon: 'bi-house-door', label: 'Dashboard', active: true, url: '/' },
    {
      icon: 'bi-briefcase',
      label: 'Projects',
      active: false,
      url: '/projects',
    },
    { icon: 'bi-check-lg', label: 'Tasks', active: false, url: '/tasks' },
    { icon: 'bi-people', label: 'Users', active: false, url: '/users' },
  ];

  setTheme(newTheme: string) {
    this.themeService.setTheme(newTheme);
  }
}
