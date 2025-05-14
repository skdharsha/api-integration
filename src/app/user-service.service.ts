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

  private baseUrl = 'https://63c2fff4b0c286fbe5f77ff5.mockapi.io/api/v1/users';


  constructor(private http: HttpClient) { }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

  addNewUser(newUser: any): Observable<any> {
    return this.http.post(this.baseUrl, newUser);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`);
  }

  editUser(id: number, editUser: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, editUser);
  }

  private taskUrl = 'https://63c2fff4b0c286fbe5f77ff5.mockapi.io/api/v1/tasks';

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl);
  }

  getTaskById(taskId : number, userId : number) : Observable<any>{
    return this.http.get(`${this.taskUrl}/${userId}/${taskId}`)
  }

  addNewTask(task: Task): Observable<any> {
    return this.http.post(this.taskUrl, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.taskUrl}/${taskId}`);
  }

  editTask(userid: number, id: number, edittask: any): Observable<any> {
    return this.http.put(`${userid}/${this.taskUrl}/${id}`, edittask);
  }


}
