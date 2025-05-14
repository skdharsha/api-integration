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

  // userIDs : number [] = [];
  @Input() userIds: number[] = [];


  newTask: Partial<Task> = {
    title: '',
    userId: +'',
    completed: false,
  }

  taskId!: number;
  isView: boolean = false;
  selectedStatus: 'all' | 'completed' | 'not' = 'all';
  selectedUserId: number | 'all' = 'all';

  constructor(private userService: UserServiceService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    console.log(this.userIds);
  }

  createTask() {
    // const postTask = this.newTask;

    //   this.userService.addNewTask(postTask).subscribe(
    //     (res) => {
    //       console.log( 'task created ',res);
    //       this.newTask = {
    //         title : '',
    //         userId : +'',
    //         completed : false,
    //       };
    //       this.router.navigate(['/task-view']);
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   )
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
  }

}
