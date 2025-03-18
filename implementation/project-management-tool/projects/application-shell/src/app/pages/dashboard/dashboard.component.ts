import { Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy } from '@angular/core';
import { MicrofrontendRegistryService } from '../../services/microfrontend-registry.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent implements OnDestroy {
  language: string;
  private destroy$ = new Subject<void>();

  constructor(
    private mfeRegistry: MicrofrontendRegistryService,
    private languageService: LanguageService
  ) {
    this.language = this.languageService.getCurrentLanguage();

    this.languageService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe((newLanguage) => {
        this.language = newLanguage;
      });
  }

  async ngOnInit() {
    const mfeBundles = [
      'http://localhost:4201/bundle.js',
      'http://localhost:4202/bundle.js',
    ];

    try {
      const results = await Promise.all(
        mfeBundles.map((url) => this.mfeRegistry.loadBundle(url))
      );

      if (!results.every((result) => result === true)) {
        console.error('Some microfrontends failed to load');
      }
    } catch (error) {
      console.error('Error loading microfrontends:', error);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
