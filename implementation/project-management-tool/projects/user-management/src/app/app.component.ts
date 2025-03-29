import { Component, inject, signal, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { User } from './types/user.type';
import { UserTableComponent } from './components/user-table/user-table.component';
import { RoleFilterComponent } from './components/role-filter/role-filter.component';
import { UserOffcanvasComponent } from './components/user-offcanvas/user-offcanvas.component';
import { CommonModule } from '@angular/common';
import { UserWidgetComponent } from './components/user-widget/user-widget.component';
import { environment } from '../environments/environment';
import { UserChartComponent } from './components/user-chart/user-chart.component';

@Component({
  selector: 'user-root',
  standalone: true,
  imports: [
    TranslateModule,
    UserTableComponent,
    RoleFilterComponent,
    FormsModule,
    CommonModule,
    UserWidgetComponent,
    UserChartComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @Input() compact: boolean = false;

  private readonly userService = inject(UserService);
  private readonly offcanvasService = inject(NgbOffcanvas);

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

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(() => this.getUsers());
  }
}
