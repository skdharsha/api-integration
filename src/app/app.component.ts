import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserAddComponent } from './user-add/user-add.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'api-integration';
}
