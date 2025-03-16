import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'task-management-host',
  standalone: true,
  template: `
    <task-management
      [compact]="compact"
      [theme]="theme"
      [language]="language"
    ></task-management>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskManagementHostComponent implements OnDestroy {
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

    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((newTheme) => {
        this.theme = newTheme;
      });

    this.languageService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe((newLanguage) => {
        this.language = newLanguage;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
