import { Component } from '@angular/core';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../types/user.type';
import { TranslateModule } from '@ngx-translate/core';
import { roles } from '../../types/role.type';

@Component({
  selector: 'user-offcanvas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './user-offcanvas.component.html',
  styleUrl: './user-offcanvas.component.scss',
})
export class UserOffcanvasComponent {
  userForm: FormGroup;
  isEditing = false;

  roles = roles;

  constructor(
    private formBuilder: FormBuilder,
    public activeOffcanvas: NgbActiveOffcanvas
  ) {
    this.userForm = this.formBuilder.group({
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
      const userData = this.userForm.value;
      this.activeOffcanvas.close(userData);
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  setUser(user: User) {
    this.isEditing = true;
    this.userForm.patchValue(user);
  }
}
