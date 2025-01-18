import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SettingsModalComponent } from './components/settings-modal/settings-modal.component';
import { ThemeService } from './services/theme.service';
import { EventService } from './services/event.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private modalService = inject(NgbModal);
  private themeService = inject(ThemeService);
  private translateService = inject(TranslateService);
  private eventService = inject(EventService);

  currentTheme: string;
  currentLanguage: string;

  constructor() {
    this.currentTheme = this.themeService.getTheme();
    this.currentLanguage =
      localStorage.getItem('language') || this.translateService.defaultLang;
    this.initializeSettings();
  }

  ngOnInit() {
    this.initializeSettings();
    this.eventService.on('user-selected', (data) => console.log('app: ', data));
    this.eventService.on('task-selected', (data) => console.log('app: ', data));
  }

  initializeSettings() {
    this.setLanguage(this.currentLanguage);
    this.setTheme(this.currentTheme);
  }

  setTheme(theme: string) {
    this.themeService.setTheme(theme);
    this.currentTheme = theme;
  }

  setLanguage(language: string) {
    this.translateService.use(language);
    this.currentLanguage = language;
    localStorage.setItem('language', language);
  }

  openSettings(open: boolean) {
    if (open) {
      const modalRef = this.modalService.open(SettingsModalComponent);
      modalRef.componentInstance.theme = this.currentTheme;
      modalRef.componentInstance.language = this.currentLanguage;

      modalRef.componentInstance.themeChange.subscribe((theme: string) => {
        this.setTheme(theme);
      });

      modalRef.componentInstance.languageChange.subscribe(
        (language: string) => {
          this.setLanguage(language);
        }
      );
    }
  }
}
