import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MicrofrontendLanguageDirective } from '../../directives/microfrontend-language.directive';

@Component({
  selector: 'task-management-host',
  standalone: true,
  imports: [MicrofrontendLanguageDirective],
  template: ` <task-management microfrontendLanguage></task-management> `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskManagementHostComponent {}
