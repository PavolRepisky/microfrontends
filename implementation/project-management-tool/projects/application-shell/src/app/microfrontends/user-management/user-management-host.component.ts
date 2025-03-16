import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'user-management-host',
  standalone: true,
  template: `
    <user-management [compact]="compact" [theme]="theme" [language]="language"></user-management>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserManagementHostComponent implements OnDestroy {
  compact: boolean;
  theme: string;
  language: string;
  
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private languageService: LanguageService
  ) {
    this.compact = this.route.snapshot.data['compact'] ?? false;
    this.theme = this.themeService.getCurrentTheme();
    this.language = this.languageService.getCurrentLanguage();

    this.themeService.theme$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((newTheme) => {
      this.theme = newTheme;
    });

    this.languageService.language$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((newLanguage) => {
      this.language = newLanguage;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
