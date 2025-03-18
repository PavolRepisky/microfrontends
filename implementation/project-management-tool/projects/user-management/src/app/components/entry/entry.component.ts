import {
  Component,
  Input,
  OnChanges,
  OnInit,
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
export class EntryComponent implements OnInit, OnChanges {
  @Input() compact = false;
  @Input() language = 'en';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.translate.use(this.language);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['language']) {
      this.translate.use(this.language);
    }
  }
}
