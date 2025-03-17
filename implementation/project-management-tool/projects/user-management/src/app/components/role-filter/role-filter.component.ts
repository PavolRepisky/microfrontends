import {
  Component,
  Input,
  Output,
  EventEmitter,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { User } from '../../types/user.type';
import { tabs } from '../../types/role.type';

@Component({
  selector: 'user-role-filter',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './role-filter.component.html',
  styleUrl: './role-filter.component.scss',
})
export class RoleFilterComponent {
  @Input() users: User[] = [];
  @Input() set selectedRole(role: string | null) {
    this.role.set(role);
  }

  @Output() onRoleSelected = new EventEmitter<string | null>();
  private readonly role = signal<string | null>(null);

  roleTabs = computed(() =>
    tabs.map((tab) => ({
      name: tab.name,
      role: tab.role,
      count: this.getUserCountForRole(tab.role),
      active: tab.role === this.role(),
    }))
  );

  private getUserCountForRole(role: string | null): number {
    return !role
      ? this.users.length
      : this.users.filter((user) => user.role === role).length;
  }

  selectRole(event: Event, role: string | null): void {
    event.preventDefault();
    this.onRoleSelected.emit(role);
  }
}
