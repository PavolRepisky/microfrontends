import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-management-host',
  standalone: true,
  template: ` <user-management [compact]="compact"></user-management> `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserManagementHostComponent {
  compact: boolean;

  constructor(private route: ActivatedRoute) {
    this.compact = this.route.snapshot.data['compact'] ?? true;
  }
}
