import { RouterModule, Routes } from '@angular/router';
import { UserAddComponent } from './user-add/user-add.component';
import { UserListComponent } from './user-list/user-list.component';
import { NgModule } from '@angular/core';
import { TaskViewComponent } from './task-view/task-view.component';

export const routes: Routes = [
    { path: '', redirectTo: 'user-list', pathMatch: 'full' },
    { path: 'user-add', component: UserAddComponent },
    { path: 'user-add/:id', component: UserAddComponent },
    { path: 'user-list', component: UserListComponent },
    { path: 'task-view', component: TaskViewComponent },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }