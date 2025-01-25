import { Component, computed, Input, signal } from '@angular/core';
import { User } from '../../types/user.type';
import { EventService } from '../../services/event.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'new-users-widget',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './new-users-widget.component.html',
  styleUrl: './new-users-widget.component.scss',
})
export class NewUsersWidgetComponent {
  @Input() set users(value: User[]) {
    this.allUsers.set(value);
  }

  allUsers = signal<User[]>([]);
  selectedUserId = signal<number | null>(null);
  selectedTaskId = signal<number | null>(null);

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.onUserSelected((data) => {
      this.selectedUserId.set(data.userId);
      this.selectedTaskId.set(null);
    });
    this.eventService.onUserUnselected(() => this.selectedUserId.set(null));

    this.eventService.onTaskSelected((data) => {
      this.selectedTaskId.set(data.taskId);
      this.selectedUserId.set(null);
    });
    this.eventService.onTaskUnselected(() => this.selectedTaskId.set(null));
  }

  filtredUsers = computed(() => {
    const minDate = new Date();
    minDate.setMonth(minDate.getMonth() - 1);
    minDate.setHours(0, 0, 0, 0);

    let currentUsers = this.allUsers().filter(
      (u) => new Date(u.createdAt) >= minDate
    );

    if (this.selectedTaskId() !== null) {
      currentUsers = currentUsers.filter((u) =>
        u.tasks.includes(this.selectedTaskId()!)
      );
    }
    return currentUsers;
  });

  onUserToggle(user: User): void {
    if (this.selectedUserId() === user.id) {
      this.eventService.emitUserUnselected();
    } else {
      this.eventService.emitUserSelected(user.id);
    }
  }
}
