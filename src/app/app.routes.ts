import { Routes } from "@angular/router";
import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { routes as userRoutes } from "./users/user.routes";

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: "No Task Selected"
  },
  {
    path: 'tasks',
    component: TasksComponent
  },
  {
    path: 'user/:userId',
    component: UserTasksComponent,
    children: userRoutes,
    data: {
      message: "HELLO WORLD"
    },
    resolve: {
      userName: resolveUserName
    },
    title: resolveTitle
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Page Not Found',
  }
];