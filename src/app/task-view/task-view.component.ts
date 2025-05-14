import { Component, OnInit } from '@angular/core';
import { Task, UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-view',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css'
})
export class TaskViewComponent implements OnInit {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  userDropdown: number[] = [];

  selectedUserId: number | 'all' = 'all';
  selectedStatus: 'all' | 'completed' | 'not' = 'all';
  searchText: string = '';

  selectedTask: Task | null = null;
  isAddMode: boolean = false;
  isViewMode: boolean = false;
  isEditMode: boolean = false;

  constructor(private userservice: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getTasks();
  }


  getTasks() {
    this.userservice.getAllTasks().subscribe(
      (res) => {
        this.tasks = res;
        this.userDropdown = [...new Set(this.tasks.map(task => task.userId))];
        this.filterTasks();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  filterTasks() {
    const text = this.searchText.toLowerCase().trim();

    this.filteredTasks = this.tasks.filter(task => {
      const matchesUser = this.selectedUserId === 'all' || task.userId === this.selectedUserId;
      const matchesStatus =
        this.selectedStatus === 'all' ||
        (this.selectedStatus === 'completed' && task.completed) ||
        (this.selectedStatus === 'not' && !task.completed);

      const matchesSearch =
        task.title.toLowerCase().includes(text) ||
        task.userId.toString().includes(text) ||
        task.createdAt.toLowerCase().includes(text);

      return matchesUser && matchesStatus && matchesSearch;
    });
  }

  selectUser(userId: number | 'all') {
    this.selectedUserId = userId;
    this.filterTasks();
  }

  selectStatus(status: 'all' | 'completed' | 'not') {
    this.selectedStatus = status;
    this.filterTasks();
  }



  addTask() {
    this.router.navigate(['/task-add']);

  }


  editTask(taskId: number) {
    this.router.navigate(['/task-edit', taskId]);
  }

  deleteTask(taskId: number) {
    this.userservice.deleteTask(taskId).subscribe(
      () => {
        console.log('Task deleted successfully');
        this.getTasks();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  viewTask(taskId: number) {
    this.router.navigate(['/task-view', taskId],{ queryParams: { view: true } });

  }
}

