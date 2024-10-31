import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, shareReplay, map } from 'rxjs/operators';
import { User } from '../models/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = './data/users.json';
  private users$ = new Observable<User[]>();

  constructor(private readonly httpClient: HttpClient) {
    this.initializeUsers();
  }

  private initializeUsers(): void {
    this.users$ = this.httpClient
      .get<User[]>(this.API_URL)
      .pipe(shareReplay(1), catchError(this.handleError));
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getUser(userId: number): Observable<User | undefined> {
    return this.users$.pipe(
      map((users) => users.find((user) => user.id === userId)),
      catchError(this.handleError)
    );
  }

  createUser(user: Omit<User, 'id'>): Observable<User[]> {
    return this.users$.pipe(
      map((users) => {
        const newUser = { ...user, id: this.generateUniqueId(users) };
        const updatedUsers = [...users, newUser];
        this.updateUsersStream(updatedUsers);
        return updatedUsers;
      }),
      catchError(this.handleError)
    );
  }

  updateUser(updatedUser: User): Observable<User[]> {
    return this.users$.pipe(
      map((users) => {
        const index = users.findIndex((user) => user.id === updatedUser.id);
        if (index === -1) {
          throw new Error(`User with id: ${updatedUser.id} not found`);
        }

        const updatedUsers = [...users];
        updatedUsers[index] = { ...users[index], ...updatedUser };
        this.updateUsersStream(updatedUsers);
        return updatedUsers;
      }),
      catchError(this.handleError)
    );
  }

  deleteUser(userId: number): Observable<User[]> {
    return this.users$.pipe(
      map((users) => {
        const updatedUsers = users.filter((user) => user.id !== userId);
        if (updatedUsers.length === users.length) {
          throw new Error(`User with id: ${userId} not found`);
        }

        this.updateUsersStream(updatedUsers);
        return updatedUsers;
      }),
      catchError(this.handleError)
    );
  }

  resetToOriginal(): Observable<User[]> {
    this.initializeUsers();
    return this.users$;
  }

  private generateUniqueId(users: User[]): number {
    const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);
    return maxId + 1;
  }

  private updateUsersStream(users: User[]): void {
    this.users$ = of(users).pipe(shareReplay(1));
  }

  private handleError(error: HttpErrorResponse | Error): Observable<never> {
    const errorMessage =
      error instanceof HttpErrorResponse
        ? `Server error: ${error.message}`
        : error.message;

    console.error('UserService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
