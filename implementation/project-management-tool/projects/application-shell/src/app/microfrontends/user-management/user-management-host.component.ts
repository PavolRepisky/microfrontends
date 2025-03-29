import { Component, OnDestroy } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MicrofrontendLanguageDirective } from '../../directives/microfrontend-language.directive';

@Component({
  selector: 'user-management-host',
  standalone: true,
  imports: [MicrofrontendLanguageDirective],
  template: ` <user-management microfrontendLanguage></user-management> `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserManagementHostComponent {}
