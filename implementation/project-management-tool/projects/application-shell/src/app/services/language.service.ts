import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly LANGUAGE_KEY = environment.languageKey;

  private languageSubject = new BehaviorSubject<string>(
    this.getInitialLanguage()
  );
  language$ = this.languageSubject.asObservable();

  constructor(private translate: TranslateService) {
    this.applyLanguage(this.getInitialLanguage());
  }

  setLanguage(lang: string) {
    this.languageSubject.next(lang);
    this.applyLanguage(lang);
    localStorage.setItem(this.LANGUAGE_KEY, lang);
  }

  getCurrentLanguage(): string {
    return this.languageSubject.value;
  }

  private getInitialLanguage(): string {
    const storedLang = localStorage.getItem(this.LANGUAGE_KEY);
    return storedLang || 'en';
  }

  private applyLanguage(lang: string) {
    this.translate.use(lang);
  }
}
