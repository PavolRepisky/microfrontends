import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'user-entry',
  standalone: true,
  imports: [AppComponent],
  template: '<user-root></user-root>',
})
export class EntryComponent {}
