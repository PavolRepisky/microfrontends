import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../theme.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

interface NavItem {
  icon: string;
  label: string;
  url: string;
  active: boolean;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, NgClass, RouterLink, TranslateModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  title = 'Microfrontends';
  theme: string;
  language: string;

  constructor(
    private themeService: ThemeService,
    private translateService: TranslateService
  ) {
    this.theme = this.themeService.getTheme();
    this.language =
      localStorage.getItem('language') || this.translateService.defaultLang;
    this.setLanguage(this.language);
    localStorage.setItem('language', this.language);
  }

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

  setTheme(theme: string) {
    this.themeService.setTheme(theme);
    this.theme = theme;
  }

  setLanguage(language: string) {
    this.translateService.use(language);
    this.language = language;
    localStorage.setItem('language', language);
  }
}
