import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface User {
  id: number;
  name: string;
  avatar: string;
  createdAt: string;
}

export interface Task {
  id: number;
  userId: number;
  title: string;
  createdAt: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private version = 'v1'
  private baseUrl = `https://63c2fff4b0c286fbe5f77ff5.mockapi.io/api/`; //'https://63c2fff4b0c286fbe5f77ff5.mockapi.io/api/v1/users';
  private taskUrl = '/tasks';

  constructor(private http: HttpClient) { }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + this.version + '/users');
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(this.baseUrl + this.version + `/users/${userId}`);
  }

  addNewUser(newUser: any): Observable<any> {
    return this.http.post(this.baseUrl + this.version + '/users', newUser);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(this.baseUrl + this.version + `/users/${userId}`);
  }

  editUser(id: number, editUser: any): Observable<any> {
    return this.http.put(this.baseUrl + this.version + `/users/${id}`, editUser);
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + this.version + this.taskUrl);
  }

  getTaskById(taskId: number): Observable<any> {
    return this.http.get(this.baseUrl + this.version + this.taskUrl + `/${taskId}`)
  }

  addNewTask(task: Task): Observable<any> {
    return this.http.post(this.baseUrl + this.version + this.taskUrl, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(this.baseUrl + this.version + this.taskUrl + `/${taskId}`);
  }

  editTask(id: number, edittask: any): Observable<any> {
    return this.http.put(this.baseUrl + this.version + this.taskUrl + `/${id}`, edittask);
  }


}
