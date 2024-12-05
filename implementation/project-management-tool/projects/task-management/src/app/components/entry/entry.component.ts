import { Component, ViewEncapsulation } from '@angular/core';
import { AppComponent } from '../../app.component';

// TODO: use ShadowDOM View Encapsulation
@Component({
  selector: 'task-entry',
  standalone: true,
  imports: [AppComponent],
  template: '<task-root></task-root>',
})
export class EntryComponent {}
