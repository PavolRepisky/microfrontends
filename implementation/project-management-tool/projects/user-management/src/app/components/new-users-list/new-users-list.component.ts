import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../types/user.type';

@Component({
  selector: 'new-users-list',
  standalone: true,
  imports: [],
  templateUrl: './new-users-list.component.html',
  styleUrl: './new-users-list.component.scss',
})
export class NewUsersListComponent {
  @Input() users: User[] = [];
  @Input() selectedUser: number | null = null;

  @Output() onSelect = new EventEmitter<User>();
}
