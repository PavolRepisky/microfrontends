import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { User } from '../types/user.type';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly usersUrl = `${environment.apiUrl}/users`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** GET: fetch all users */
  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.usersUrl)
      .pipe(catchError(this.handleError<User[]>('getAllUsers', [])));
  }

  /** GET: fetch user by id. Return `null` when id not found */
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http
      .get<User>(url)
      .pipe(catchError(this.handleError<User>(`getUser id=${id}`)));
  }

  /** POST: create a new user */
  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http
      .post<User>(this.usersUrl, user, this.httpOptions)
      .pipe(catchError(this.handleError<User>('createUser')));
  }

  /** PUT: update the user */
  updateUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http
      .put<User>(url, user, this.httpOptions)
      .pipe(catchError(this.handleError<any>(`updateUser id=${user.id}`)));
  }

  /** DELETE: delete the user */
  deleteUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;

    return this.http
      .delete<User>(url, this.httpOptions)
      .pipe(catchError(this.handleError<User>(`deleteUser id=${id}`)));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
