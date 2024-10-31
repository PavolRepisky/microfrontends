import {
  Component,
  inject,
  OnInit,
  signal,
  DestroyRef,
  computed,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NgbModal,
  NgbModalRef,
  NgbOffcanvas,
  NgbOffcanvasRef,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { EMPTY, catchError, finalize } from 'rxjs';

import { UserService } from './services/user.service';
import { User } from './models/user.type';
import { UserTableComponent } from './components/user-table/user-table.component';
import { RoleFilterComponent } from './components/role-filter/role-filter.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { Role } from './models/role.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'user-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateModule,
    UserTableComponent,
    RoleFilterComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly modalService = inject(NgbModal);
  private readonly offcanvasService = inject(NgbOffcanvas);
  private readonly userService = inject(UserService);
  private readonly destroyRef = inject(DestroyRef);

  readonly allUsers = signal<User[]>([]);
  readonly selectedRole = signal<Role>('');
  readonly searchTerm = signal<string>('');

  isLoading = signal<boolean>(false);

  protected readonly users = computed(() => {
    const role = this.selectedRole();
    const search = this.searchTerm().toLowerCase().trim();
    let filteredUsers = this.allUsers();

    if (role !== '') {
      filteredUsers = filteredUsers.filter((user) => user.role === role);
    }

    if (search) {
      filteredUsers = filteredUsers.filter((user) =>
        Object.values(user).some(
          (value) => value && value.toString().toLowerCase().includes(search)
        )
      );
    }

    return filteredUsers;
  });

  ngOnInit(): void {
    this.loadUsers();
  }

  onRoleSelect(role: Role): void {
    this.selectedRole.set(role);
  }

  onSearchChange(term: string): void {
    this.searchTerm.set(term);
  }

  openUserForm(user?: User): void {
    const offcanvasRef: NgbOffcanvasRef = this.offcanvasService.open(
      UserFormComponent,
      {
        position: 'end',
        backdrop: true,
        keyboard: false,
      }
    );

    if (user) {
      offcanvasRef.componentInstance.setUser(user);
    }

    offcanvasRef.closed
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          console.error('Error in offcanvas operation:', error);
          return EMPTY;
        })
      )
      .subscribe((formUser: User | undefined) => {
        if (!formUser) return;

        const operation =
          formUser.id !== null
            ? this.userService.updateUser(formUser)
            : this.userService.createUser(formUser);

        operation
          .pipe(
            takeUntilDestroyed(this.destroyRef),
            catchError((error) => {
              console.error(
                `Error ${formUser.id ? 'updating' : 'creating'} user:`,
                error
              );
              return EMPTY;
            })
          )
          .subscribe((updatedUsers) => this.allUsers.set(updatedUsers));
      });
  }

  loadUsers(): void {
    this.isLoading.set(true);

    this.userService
      .getUsers()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false)),
        catchError((error) => {
          console.error('Error loading users:', error);
          return EMPTY;
        })
      )
      .subscribe((users) => this.allUsers.set(users));
  }

  async openDeleteConfirmation(user: User): Promise<void> {
    try {
      const modalRef: NgbModalRef = this.modalService.open(
        ConfirmationModalComponent,
        {
          centered: true,
          backdrop: 'static',
        }
      );

      modalRef.componentInstance.title = 'confirmationModal.title';
      modalRef.componentInstance.message = 'confirmationModal.message';
      modalRef.componentInstance.userData = user;

      const confirmed = await modalRef.result;

      if (confirmed && user.id) {
        this.deleteUser(user.id);
      }
    } catch {}
  }

  deleteUser(userId: number): void {
    this.userService
      .deleteUser(userId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          console.error('Error deleting user:', error);
          return EMPTY;
        })
      )
      .subscribe((updatedUsers) => this.allUsers.set(updatedUsers));
  }
}
