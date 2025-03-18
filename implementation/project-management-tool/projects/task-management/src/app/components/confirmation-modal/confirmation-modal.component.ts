import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'task-confirmation-modal',
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
