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
import { User } from '../../models/user.type';
import { Role } from '../../models/role.type';

interface RoleDefinition {
  label: string;
  role: Role;
}

@Component({
  selector: 'user-role-filter',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './role-filter.component.html',
  styleUrl: './role-filter.component.scss',
})
export class RoleFilterComponent {
  private static readonly ROLES: readonly RoleDefinition[] = [
    { label: 'roleFilter.tabs.all', role: '' },
    { label: 'roleFilter.tabs.admins', role: 'admin' },
    { label: 'roleFilter.tabs.projectManagers', role: 'projectManager' },
    { label: 'roleFilter.tabs.developers', role: 'developer' },
    { label: 'roleFilter.tabs.designers', role: 'designer' },
    { label: 'roleFilter.tabs.testers', role: 'tester' },
  ] as const;

  @Input({ required: true }) set users(value: User[]) {
    this.users$.set(value);
  }

  @Input() set currentRole(value: Role) {
    this.currentRole$.set(value);
  }

  @Input() disabled = false;

  @Output() onRoleSelect = new EventEmitter<Role>();

  private readonly users$ = signal<User[]>([]);
  private readonly currentRole$ = signal<Role>('');

  protected readonly roleTabs = computed(() =>
    RoleFilterComponent.ROLES.map(({ label, role }) => ({
      label,
      role,
      count: this.getUserCountForRole(role),
      isActive: role === this.currentRole$(),
    }))
  );

  private getUserCountForRole(role: Role): number {
    const users = this.users$();
    return role === ''
      ? users.length
      : users.filter((user) => user.role === role).length;
  }

  onRoleClick(event: Event, role: Role): void {
    event.preventDefault();
    if (!this.disabled) {
      this.onRoleSelect.emit(role);
    }
  }
}
