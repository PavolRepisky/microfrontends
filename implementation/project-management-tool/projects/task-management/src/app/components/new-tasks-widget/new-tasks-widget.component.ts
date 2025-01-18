import { Component, computed, Input, OnInit, signal } from '@angular/core';
import { Task } from '../../types/task.type';
import { EventService } from '../../services/event.service';
import { TranslateModule } from '@ngx-translate/core';
import { N } from '@angular/cdk/keycodes';

@Component({
  selector: 'new-tasks-widget',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './new-tasks-widget.component.html',
  styleUrl: './new-tasks-widget.component.scss',
})
export class NewTasksWidgetComponent implements OnInit {
  @Input() set tasks(value: Task[]) {
    this.allTasks.set(value);
  }

  allTasks = signal<Task[]>([]);
  selectedTaskId = signal<number | null>(null);
  selectedUserId = signal<number | null>(null);

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.onTaskSelected((data) => {
      this.selectedTaskId.set(data.taskId);
      this.selectedUserId.set(null);
    });
    this.eventService.onTaskUnselected(() => this.selectedTaskId.set(null));

    this.eventService.onUserSelected((data) => {
      this.selectedUserId.set(data.userId);
      this.selectedTaskId.set(null);
    });
    this.eventService.onUserUnselected(() => this.selectedUserId.set(null));
  }

  filtredTasks = computed(() => {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - 7);
    minDate.setHours(0, 0, 0, 0);

    let currentTasks = this.allTasks().filter(
      (t) => new Date(t.createdAt) >= minDate
    );

    if (this.selectedUserId() !== null) {
      currentTasks = currentTasks.filter((t) =>
        t.assignees.includes(this.selectedUserId()!)
      );
    }
    return currentTasks;
  });

  onTaskToggle(task: Task): void {
    if (this.selectedTaskId() === task.id) {
      this.eventService.emitTaskUnselected();
    } else {
      this.eventService.emitTaskSelected(task.id);
    }
  }
}
