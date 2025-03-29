import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

@Directive({
  standalone: true,
  selector: '[microfrontendLanguage]',
})
export class MicrofrontendLanguageDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private element: ElementRef,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.translateService.onLangChange
      .pipe(
        map((event) => event.lang),
        startWith(
          this.translateService.currentLang ?? this.translateService.defaultLang
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((language) => {
        this.element.nativeElement.language = language;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
