import { Component, OnInit } from '@angular/core';
import { User, UserServiceService } from '../user-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-user-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent implements OnInit {

  newUser: Partial<User> = {
    name: '',
    avatar: ''
  };
  userId !: number;
  isViewMode: boolean = false;

  constructor(private userService: UserServiceService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const viewParam = this.route.snapshot.queryParamMap.get('view');

    if (idParam) {
      this.userId = +idParam;
      this.getUserById();
    }

    if (viewParam === 'true') {
      this.isViewMode = true;
    }
  }

  createUser() {
    if (!this.newUser.name || !this.newUser.avatar) {
      alert("Pleace enter name and avatar..");
      return;
    }

    //create new user
    if (!this.userId) {
      const postUser = {
        ...this.newUser,
        createdAt: new Date().toISOString(),
      }

      this.userService.addNewUser(postUser).subscribe(
        (response) => {
          console.log("user created", response);
          this.newUser = {
            name: '',
            avatar: '',
          };
          this.router.navigate(['/user-list']);

        },
        (error) => {
          console.error(error);
        }
      );
    } else {

      //update user
      this.userService.editUser(this.userId, this.newUser).subscribe(
        () => {
          this.newUser = {
            name: '',
            avatar: ''
          }
          this.router.navigate(['/user-list']);
        },
        (error) => {
          console.log(error);
        }

      );
    }


  }

  getUserById() {
    this.userService.getUserById(this.userId).subscribe(
      (res: User) => {
        this.newUser = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}



