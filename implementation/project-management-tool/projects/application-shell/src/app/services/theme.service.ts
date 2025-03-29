import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = environment.themeKey;

  private themeSubject = new BehaviorSubject<string>(this.getInitialTheme());
  theme$ = this.themeSubject.asObservable();

  constructor() {
    this.applyTheme(this.getInitialTheme());
  }

  setTheme(theme: string) {
    this.themeSubject.next(theme);
    this.applyTheme(theme);
    localStorage.setItem(this.THEME_KEY, theme);
  }

  getCurrentTheme(): string {
    return this.themeSubject.value;
  }

  private getInitialTheme(): string {
    const storedTheme = localStorage.getItem(this.THEME_KEY);
    console.log('storedTheme', storedTheme);
    return storedTheme || 'light';
  }

  private applyTheme(theme: string) {
    document.body.setAttribute('data-bs-theme', theme);
  }
}
