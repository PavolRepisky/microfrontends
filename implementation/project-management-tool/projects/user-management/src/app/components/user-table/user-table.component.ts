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
import { User } from '../../models/user.type';

const ITEMS_PER_PAGE = 6;

@Component({
  selector: 'user-user-table',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent {
  @Input({ required: true }) set users(value: User[]) {
    this.users$.set(value);
  }
  @Input() loading = false;

  @Output() onEdit = new EventEmitter<User>();
  @Output() onView = new EventEmitter<User>();
  @Output() onDelete = new EventEmitter<User>();

  private readonly users$ = signal<User[]>([]);
  currentPage$ = signal(1);

  protected readonly paginatedUsers = computed(() => {
    const startIndex = (this.currentPage$() - 1) * ITEMS_PER_PAGE;
    return this.users$().slice(startIndex, startIndex + ITEMS_PER_PAGE);
  });

  protected readonly totalPages = computed(() =>
    Math.ceil(this.users$().length / ITEMS_PER_PAGE)
  );

  protected readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1)
  );

  setPage(event: Event, page: number): void {
    event.preventDefault();
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage$.set(page);
    }
  }

  handlePageChange(remainingItems: number): void {
    const maxPage = Math.ceil(remainingItems / ITEMS_PER_PAGE);
    if (this.currentPage$() > maxPage) {
      this.currentPage$.set(Math.max(1, maxPage));
    }
  }
}
