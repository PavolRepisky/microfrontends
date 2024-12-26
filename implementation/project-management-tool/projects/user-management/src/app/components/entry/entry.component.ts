import { Component, Input } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'user-entry',
  standalone: true,
  imports: [AppComponent],
  template: '<user-root [compact]="compact"></user-root>',
})
export class EntryComponent {
  @Input() compact: boolean = false;
}
