import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'task-management-host',
  standalone: true,
  template: ` <task-management></task-management> `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskManagementHostComponent {}
