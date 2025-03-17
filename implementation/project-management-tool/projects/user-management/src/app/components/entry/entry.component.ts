import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { AppComponent } from '../../app.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'user-entry',
  standalone: true,
  imports: [AppComponent],
  template: '<user-root [compact]="compact"></user-root>',
})
export class EntryComponent implements OnChanges {
  @Input() compact = false;
  @Input() language = 'en';

  constructor(private translate: TranslateService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes');
    if (changes['language']) {
      this.translate.use(this.language);
      console.log('User MFE language changed:', this.language);
    }
  }
}
