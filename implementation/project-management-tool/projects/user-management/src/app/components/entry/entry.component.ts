import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { AppComponent } from '../../app.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'user-entry',
  standalone: true,
  imports: [AppComponent],
  template: '<user-root [compact]="compact"></user-root>',
  styleUrl: '../../../styles.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class EntryComponent implements OnChanges {
  @Input() compact = false;
  @Input() language?: 'en' | 'sk';

  constructor(private translateService: TranslateService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['language'] && this.language) {
      this.translateService.use(this.language);
    }
  }
}
