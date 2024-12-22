import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { User } from '../../types/user.type';
import { roles } from '../../types/role.type';

const ITEMS_PER_PAGE = 6;

@Component({
  selector: 'user-table',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent {
  @Input() set users(value: User[]) {
    this.allUsers.set(value);
  }

  @Output() onEdit = new EventEmitter<User>();
  @Output() onView = new EventEmitter<User>();
  @Output() onDelete = new EventEmitter<User>();

  private allUsers = signal<User[]>([]);
  currentPage = signal(1);

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
}
