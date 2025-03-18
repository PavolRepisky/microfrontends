import {
  Component,
  EventEmitter,
  Input,
  Output,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { User } from '../../types/user.type';
import { roles } from '../../types/role.type';
import {
  NgbModal,
  NgbModalRef,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

const ITEMS_PER_PAGE = 6;

@Component({
  selector: 'user-table',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgbDropdownModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent {
  @Input() set users(value: User[]) {
    this.allUsers.set(value);
  }

  @Output() onEditUser = new EventEmitter<User>();
  @Output() onViewUser = new EventEmitter<User>();
  @Output() onDeleteUser = new EventEmitter<number>();

  private allUsers = signal<User[]>([]);
  currentPage = signal(1);

  constructor(private modalService: NgbModal) {}

  readonly paginatedUsers = computed(() => {
    const startIndex = (this.currentPage() - 1) * ITEMS_PER_PAGE;
    return this.allUsers().slice(startIndex, startIndex + ITEMS_PER_PAGE);
  });

  readonly totalPages = computed(() =>
    Math.ceil(this.allUsers().length / ITEMS_PER_PAGE)
  );

  readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  setPage(event: Event, page: number): void {
    event.preventDefault();
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  getRoleColor(role: string): string | undefined {
    const color = roles.find((r) => r.name === role)?.color;
    return color ? color : 'secondary';
  }

  openDeleteConfirmation(userId: number): void {
    const modalRef: NgbModalRef = this.modalService.open(
      ConfirmationModalComponent,
      { centered: true, backdrop: 'static' }
    );

    modalRef.componentInstance.title = 'delete.title';
    modalRef.componentInstance.message = 'delete.message';
    
    modalRef.closed.subscribe((result: boolean) => {
      if (result) this.onDeleteUser.emit(userId);
    });
  }
}
