import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { tags, priorities, Task, statuses } from '../../types/task.type';
import { User } from '../../types/user.type';

@Component({
  selector: 'task-offcanvas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './task-offcanvas.component.html',
  styleUrl: './task-offcanvas.component.scss',
})
export class TaskOffcanvasComponent {
  taskForm: FormGroup;
  isEditing = false;

  users: User[] = [];
  selectedAssignees: User[] = [];

  tags = tags;
  priorities = priorities;
  statuses = statuses;

  constructor(
    private formBuilder: FormBuilder,
    public activeOffcanvas: NgbActiveOffcanvas
  ) {
    this.taskForm = this.formBuilder.group({
      id: [null],
      title: ['', Validators.required],
      status: ['', Validators.required],
      priority: [''],
      tag: [''],
      dueDate: [''],
      description: [''],
      assignees: [[]],
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.taskForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      this.activeOffcanvas.close(taskData);
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  availableUsers = () => {
    return this.users.filter(
      (user) =>
        !this.selectedAssignees.some(
          (selectedUser) => selectedUser.id === user.id
        )
    );
  };

  addAssignee(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const userId = Number(select.value);

    if (!userId) return;

    const user = this.users.find((u) => u.id === userId);
    if (user) {
      this.selectedAssignees.push(user);
      this.taskForm.patchValue({
        assignees: [...this.selectedAssignees].map((u) => u.id),
      });
      select.value = '';
    }
  }

  removeAssignee(assignee: User): void {
    this.selectedAssignees = this.selectedAssignees.filter(
      (u) => u.id !== assignee.id
    );
    this.taskForm.patchValue({
      assignees: [...this.selectedAssignees].map((u) => u.id),
    });
  }

  setTask(task: Partial<Task>) {
    this.isEditing = true;
    const taskToSet = { ...task };

    if (task.assignees?.length) {
      const assigneeUsers = this.users.filter((user) =>
        task.assignees?.includes(user.id)
      );
      this.selectedAssignees = assigneeUsers;
      taskToSet.assignees = assigneeUsers.map((u) => u.id);
    }

    if (taskToSet.dueDate) {
      const date = new Date(taskToSet.dueDate);
      taskToSet.dueDate = date.toISOString().split('T')[0];
    }

    this.taskForm.patchValue(taskToSet);
  }

  setUsers(users: User[]) {
    this.users = users;
  }
}
