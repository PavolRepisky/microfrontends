import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../../types/task.type';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'task-offcanvas',
  standalone: true,
  imports: [TranslateModule, CommonModule, ReactiveFormsModule],
  templateUrl: './task-offcanvas.component.html',
  styleUrl: './task-offcanvas.component.scss',
})
export class TaskOffcanvasComponent {
  private fb = inject(FormBuilder);
  activeOffcanvas = inject(NgbActiveOffcanvas);

  taskForm: FormGroup;
  isEdit = false;
  isSubmitting = false;

  constructor() {
    this.taskForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      status: ['', Validators.required],
      priority: [''],
      tag: [''],
      dueDate: [''],
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.taskForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.isSubmitting = true;
      const taskData = this.taskForm.value;
      this.activeOffcanvas.close(taskData);
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  setTask(task: Partial<Task>) {
    this.isEdit = true;
    this.taskForm.patchValue(task);
  }

  setSubmitting(value: boolean) {
    this.isSubmitting = value;
  }
}
