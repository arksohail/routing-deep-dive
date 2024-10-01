import { Routes } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent
  },
  {
    path: 'tasks',
    component: TasksComponent
  },
  {
    path: 'user/:userId',
    component: UserTasksComponent,
    children: [
      {
        path: 'tasks',
        component: TasksComponent
      },
      {
        path: 'new',
        component: NewTaskComponent
      }
    ]
  }
];