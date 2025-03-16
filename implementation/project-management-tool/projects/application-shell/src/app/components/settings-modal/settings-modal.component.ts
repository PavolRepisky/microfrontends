import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './settings-modal.component.html',
  styleUrl: './settings-modal.component.scss',
})
export class SettingsModalComponent {
  theme: string;
  language: string;

  constructor(
    public activeModal: NgbActiveModal,
    private themeService: ThemeService,
    private languageService: LanguageService
  ) {
    this.theme = this.themeService.getCurrentTheme();
    this.language = this.languageService.getCurrentLanguage();
  }

  changeTheme() {
    this.themeService.setTheme(this.theme);
  }

  changeLanguage() {
    this.languageService.setLanguage(this.language);
  }

  availableThemes = ['light', 'dark'];
  availableLanguages = ['en', 'sk'];
}
