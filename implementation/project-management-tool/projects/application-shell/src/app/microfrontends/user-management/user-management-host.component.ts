import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'user-management-host',
  standalone: true,
  template: ` <user-management></user-management> `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserManagementHostComponent {}
