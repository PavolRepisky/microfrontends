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
  selector: 'task-entry',
  standalone: true,
  imports: [AppComponent],
  template: '<task-root [compact]="compact"></task-root>',
  styleUrl: '../../../styles.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class EntryComponent implements OnChanges {
  @Input() compact: boolean = false;
  @Input() language?: 'en' | 'sk';

  constructor(private translateService: TranslateService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['language'] && this.language) {
      this.translateService.use(this.language);
    }
  }
}
