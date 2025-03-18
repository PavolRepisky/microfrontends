import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Task } from '../types/task.type';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly tasksUrl = `${environment.apiUrl}/tasks`;
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(this.tasksUrl)
      .pipe(catchError(this.handleError<Task[]>('getTasks', [])));
  }

  getTask(id: number): Observable<Task> {
    return this.http
      .get<Task>(`${this.tasksUrl}/${id}`)
      .pipe(catchError(this.handleError<Task>(`getTask id=${id}`)));
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http
      .post<Task>(this.tasksUrl, task, this.httpOptions)
      .pipe(catchError(this.handleError<Task>('createTask')));
  }

  updateTask(task: Task): Observable<Task> {
    return this.http
      .put<Task>(`${this.tasksUrl}/${task.id}`, task, this.httpOptions)
      .pipe(catchError(this.handleError<any>('updateTask')));
  }

  deleteTask(id: number): Observable<Task> {
    return this.http
      .delete<Task>(`${this.tasksUrl}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError<Task>('deleteTask')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }
}
