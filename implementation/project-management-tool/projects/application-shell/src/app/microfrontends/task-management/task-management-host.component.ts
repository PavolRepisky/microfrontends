import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'task-management-host',
  standalone: true,
  template: ` <task-management [compact]="compact"></task-management> `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaskManagementHostComponent {
  compact: boolean;

  constructor(private route: ActivatedRoute) {
    this.compact = this.route.snapshot.data['compact'] ?? true;
  }
}
