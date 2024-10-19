import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme: string;

  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.applyTheme(this.theme);
  }

  getTheme(): string {
    return this.theme;
  }

  setTheme(newTheme: string) {
    this.theme = newTheme;
    this.applyTheme(this.theme);
    localStorage.setItem('theme', this.theme);
  }

  private applyTheme(theme: string) {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }
}
