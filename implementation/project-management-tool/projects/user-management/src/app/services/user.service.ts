import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { User } from '../types/user.type';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly usersUrl = `${environment.apiUrl}/users`;
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.usersUrl)
      .pipe(catchError(this.handleError<User[]>('getUsers', [])));
  }

  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.usersUrl}/${id}`)
      .pipe(catchError(this.handleError<User>(`getUser id=${id}`)));
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http
      .post<User>(this.usersUrl, user, this.httpOptions)
      .pipe(catchError(this.handleError<User>('createUser')));
  }

  updateUser(user: User): Observable<User> {
    return this.http
      .put<User>(`${this.usersUrl}/${user.id}`, user, this.httpOptions)
      .pipe(catchError(this.handleError<User>(`updateUser id=${user.id}`)));
  }

  deleteUser(id: number): Observable<User> {
    return this.http
      .delete<User>(`${this.usersUrl}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError<User>(`deleteUser id=${id}`)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }
}
