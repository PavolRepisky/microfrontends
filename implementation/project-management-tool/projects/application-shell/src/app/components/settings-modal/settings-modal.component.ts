import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './settings-modal.component.html',
  styleUrl: './settings-modal.component.scss',
})
export class SettingsModalComponent {
  activeModal = inject(NgbActiveModal);

  @Input() theme: string = 'light';
  @Input() language: string = 'en';

  @Output() themeChange = new EventEmitter<string>();
  @Output() languageChange = new EventEmitter<string>();

  onThemeChange(theme: string) {
    this.theme = theme;
    this.themeChange.emit(theme);
  }

  onLanguageChange(language: string) {
    this.language = language;
    this.languageChange.emit(language);
  }
}
