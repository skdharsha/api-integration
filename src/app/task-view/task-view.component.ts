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
  searchTask: string = '';
  filtertask: Task[] = [];
  userDropdown: number[] = [];

  constructor(private userservice: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getTask();
  }


  getTask() {
    this.userservice.getAllTasks().subscribe(
      (res) => {
        this.tasks = res;
        this.userDropdown = [...new Set(this.tasks.map(task => task.userId))];
        this.filtertask = [...this.tasks];
        console.log(this.tasks);
      
      },
      (error) => {
        console.error(error);
      }
    )
  }

  filterTask() {

    if (!this.searchTask) {
      this.filtertask = [...this.tasks];
      return;
    }
    const filteredTask = this.searchTask.toLowerCase().trim();
    this.filtertask = this.tasks.filter(task => task.title.toString().includes(filteredTask)
    );
  }

}
