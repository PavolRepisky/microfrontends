import { Component, ViewEncapsulation } from '@angular/core';
import { AppComponent } from '../../app.component';

// TODO: use ShadowDOM View Encapsulation
@Component({
  selector: 'user-entry',
  standalone: true,
  imports: [AppComponent],
  template: '<user-root></user-root>',
})
export class EntryComponent {}
