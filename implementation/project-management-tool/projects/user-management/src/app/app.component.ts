import { Component, inject, OnInit, signal, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  NgbModal,
  NgbModalRef,
  NgbOffcanvas,
  NgbOffcanvasRef,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { User } from './types/user.type';
import { UserTableComponent } from './components/user-table/user-table.component';
import { RoleFilterComponent } from './components/role-filter/role-filter.component';
import { UserOffcanvasComponent } from './components/user-offcanvas/user-offcanvas.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { CommonModule } from '@angular/common';
import { NewUsersWidgetComponent } from './components/new-users-widget/new-users-widget.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'user-root',
  standalone: true,
  imports: [
    TranslateModule,
    UserTableComponent,
    RoleFilterComponent,
    FormsModule,
    CommonModule,
    NewUsersWidgetComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly modalService = inject(NgbModal);
  private readonly offcanvasService = inject(NgbOffcanvas);

  @Input() compact = true;
  embeded = environment.embedded;

  users = signal<User[]>([]);
  filteredUsers = signal<User[]>([]);
  selectedRole = signal<string | null>(null);
  selectedUser = signal<number | null>(null);

  ngOnInit(): void {
    this.getUsers();
  }

  selectRole(role: string | null): void {
    this.selectedRole.set(role);
    this.filterUsers();
  }

  openUserOffcanvas(user?: Partial<User>): void {
    const offcanvasRef: NgbOffcanvasRef = this.offcanvasService.open(
      UserOffcanvasComponent,
      { position: 'end' }
    );

    if (user) offcanvasRef.componentInstance.setUser(user);

    offcanvasRef.closed.subscribe((formData?: User) => {
      if (!formData) return;

      formData.id ? this.updateUser(formData) : this.createUser(formData);

      offcanvasRef.dismiss();
    });
  }

  openDeleteConfirmation(user: User): void {
    const modalRef: NgbModalRef = this.modalService.open(
      ConfirmationModalComponent,
      { centered: true, backdrop: 'static' }
    );

    modalRef.componentInstance.title = 'userDeleteModal.title';
    modalRef.componentInstance.message = 'userDeleteModal.message';
    modalRef.componentInstance.userData = user;

    modalRef.closed.subscribe((result: boolean) => {
      if (result) this.deleteUser(user.id);
    });
  }

  filterUsers(): void {
    this.filteredUsers.set(
      this.users().filter(
        (u) => this.selectedRole() === null || u.role === this.selectedRole()
      )
    );
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users.set(users);
      this.filterUsers();
    });
  }

  createUser(user: Omit<User, 'id'>): void {
    this.userService.createUser(user).subscribe(() => this.getUsers());
  }

  updateUser(user: User): void {
    this.userService.updateUser(user).subscribe(() => this.getUsers());
  }

  deleteUser(taskId: number): void {
    this.userService.deleteUser(taskId).subscribe(() => this.getUsers());
  }
}
