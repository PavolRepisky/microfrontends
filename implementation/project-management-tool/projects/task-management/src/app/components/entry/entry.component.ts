import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'task-entry',
  standalone: true,
  imports: [AppComponent],
  template: '<task-root [compact]="compact"></task-root>',
})
export class EntryComponent {
  @Input() compact: boolean = false;
}
