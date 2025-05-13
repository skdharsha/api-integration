import { Component, OnInit } from '@angular/core';
import { User, UserServiceService } from '../user-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  searchUser: string = '';
  filteredUsers: User[] = [];


  constructor(private userService: UserServiceService, private route: Router) { }

  ngOnInit() {
    this.getUsers();
  }


  getUsers() {
    this.userService.getUsers().subscribe(
      (response) => {
        console.log('API Response:', response);
        this.users = response;
        this.filteredUsers = [...this.users];
       
      },
      (error) => {
        console.error(error);
      }
    );
  }

  filterUser() {
    if (!this.searchUser) {
      this.filteredUsers = [...this.users];
      return;

    }
    const searchedText = this.searchUser.toLowerCase().trim();
    this.filteredUsers = this.users.filter(user => user.name.toLowerCase().includes(searchedText)
    );
  }

  createUser() {
    this.route.navigate(['/user-add']);
  }

  editUser(userId: number) {
    this.route.navigate(['/user-add', userId])
  }

  deleteUser(userId: number) {

    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log('User deleted successfully');
        this.getUsers();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  viewUser(userId: number) {
  this.route.navigate(['/user-add', userId], { queryParams: { view: true } });
  }

}