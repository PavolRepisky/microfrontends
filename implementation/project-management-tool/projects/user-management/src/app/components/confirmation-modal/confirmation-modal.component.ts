import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { User } from '../../models/user.type';

@Component({
  selector: 'user-confirmation-modal',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
})
export class ConfirmationModalComponent {
  activeModal = inject(NgbActiveModal);

  @Input() title!: string;
  @Input() message!: string;
  @Input() userData?: User;
}
