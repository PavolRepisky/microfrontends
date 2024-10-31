import { Component, inject } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.type';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'user-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  private fb = inject(FormBuilder);
  activeOffcanvas = inject(NgbActiveOffcanvas);

  userForm: FormGroup;
  isEdit = false;
  isSubmitting = false;

  constructor() {
    this.userForm = this.fb.group({
      id: [null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      role: ['', Validators.required],
      status: ['', Validators.required],
      bio: [''],
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      const userData = this.userForm.value;
      this.activeOffcanvas.close(userData);
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  setUser(user: User) {
    this.isEdit = true;
    this.userForm.patchValue(user);
  }
}
