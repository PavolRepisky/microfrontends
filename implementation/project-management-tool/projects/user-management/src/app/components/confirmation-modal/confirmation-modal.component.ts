import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

interface ConfirmationModalConfig {
  title: string;
  message: string;
  data?: any;
}

@Component({
  selector: 'user-confirmation-modal',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
})
export class ConfirmationModalComponent {
  message = '';
  title = '';

  constructor(public activeModal: NgbActiveModal) {}
}
