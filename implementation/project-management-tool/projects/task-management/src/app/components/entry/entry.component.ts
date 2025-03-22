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
  selector: 'task-entry',
  standalone: true,
  imports: [AppComponent],
  template: '<task-root [compact]="compact"></task-root>',
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
