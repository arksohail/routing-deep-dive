import { Route } from "@angular/router";
import { NewTaskComponent } from "../tasks/new-task/new-task.component";
import { resolveUserTasks, TasksComponent } from "../tasks/tasks.component";

export const routes: Route[] = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'prefix'
  },
  {
    path: 'tasks',
    component: TasksComponent,
    runGuardsAndResolvers:  'paramsOrQueryParamsChange',   
    resolve: {
      userTasks: resolveUserTasks
    }
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent
  }
];