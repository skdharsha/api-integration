import { Component, Input, OnInit } from '@angular/core';
import { Task, UserServiceService } from '../user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-models',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-models.component.html',
  styleUrl: './task-models.component.css'
})
export class TaskModelsComponent implements OnInit {

  newTask: Partial<Task> = {
    title: '',
    userId: undefined,
    completed: false,
  }

  taskId!: number;
  isView: boolean = false;
  selectedStatus: 'all' | 'completed' | 'not' = 'all';
  selectedUserId: number | 'all' = 'all';
  userIDs: number[] | undefined;

  constructor(private userService: UserServiceService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getUsersFromTask();
    const idParam = this.route.snapshot.paramMap.get('id');
    const viewParam = this.route.snapshot.queryParamMap.get('view');

    if (idParam) {
      this.taskId = +idParam;
      this.getTaskById();
    }

    if (viewParam === 'true') {
      this.isView = true;
    }
  }

  getUsersFromTask() {
    this.userService.getAllTasks().subscribe((tasks) => {
      const userIds = tasks.map(task => task.userId);
      this.userIDs = [...new Set(userIds)];
      console.log(this.userIDs);
    }
    );
  }

  createTask() {
    if (!this.newTask.title || this.selectedUserId === 'all') {
      alert('Please enter a task title and select a user.');
      return;
    }

    if (!this.taskId) {
      const taskToSend: Task = {
        id: Date.now(),
        title: this.newTask.title,
        userId: this.selectedUserId as number,
        completed: this.newTask.completed || false,
        createdAt: new Date().toISOString()
      };

      this.userService.addNewTask(taskToSend).subscribe(
        (res) => {
          console.log('Task created:', res);
          this.newTask = {
            title: '',
            userId: undefined,
            completed: false
          };
          this.selectedUserId = 'all';
          this.selectedStatus = 'all';
          this.router.navigate(['/task-view']);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {

      this.userService.editTask(this.taskId, this.newTask).subscribe(
        () => {
          this.newTask = {
            title: '',
            userId: undefined,
            completed: false
          };
          this.selectedUserId = 'all';
          this.selectedStatus = 'all';
          this.router.navigate(['/task-view']);
        },
        (error) => {
          console.error(error);
        }
      )
    }
  }


  selectStatus(status: 'all' | 'completed' | 'not') {
    this.selectedStatus = status;
    if (this.selectedStatus == 'all' || this.selectedStatus == 'not') {
      this.newTask.completed = false;
    } else {
      this.newTask.completed = true;
    }

  }

  selectUser(userId: number | 'all') {
    this.selectedUserId = userId;
    this.newTask.userId = userId === 'all' ? undefined : userId;
  }

  getTaskById() {
    this.userService.getTaskById(this.taskId).subscribe(
      (res: Task) => {
        this.newTask = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
