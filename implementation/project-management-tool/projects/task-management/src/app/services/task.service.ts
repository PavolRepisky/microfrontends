import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Task } from '../types/task.type';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly tasksUrl = `${environment.apiUrl}/tasks`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** GET: fetch all tasks */
  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.tasksUrl)
      .pipe(catchError(this.handleError<Task[]>('getAllTasks', [])));
  }

  /** GET: fetch task by id. Return `null` when id not found */
  getTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http
      .get<Task>(url)
      .pipe(catchError(this.handleError<Task>(`getTask id=${id}`)));
  }

  /** POST: create a new task */
  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http
      .post<Task>(this.tasksUrl, task, this.httpOptions)
      .pipe(catchError(this.handleError<Task>('createTask')));
  }

  /** PUT: update the task */
  updateTask(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}/${task.id}`;
    return this.http
      .put<Task>(url, task, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateTask')));
  }

  /** DELETE: delete the task */
  deleteTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;

    return this.http
      .delete<Task>(url, this.httpOptions)
      .pipe(catchError(this.handleError<Task>('deleteTask')));
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
