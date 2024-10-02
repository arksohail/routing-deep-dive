import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ParamMap, ResolveFn, RouterLink, RouterStateSnapshot } from '@angular/router';
import { Task } from './task/task.model';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  // userId = input.required<string>(); // Only accesible using the withRouterConfig({paramsInheritanceStrategy: 'always'})
  // message = input(); // Only accesible using the withRouterConfig({paramsInheritanceStrategy: 'always'})
  // order?: 'asc' | 'desc';
  // order = signal<'asc' | 'desc'>('asc');
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);
  // private taskService = inject(TasksService);
  // userTasks = computed(() => {
  //   return this.taskService.allTasks()
  //   .filter(u => u.userId === this.userId())
  //   .sort((a, b) => {
  //     if(this.order() === 'desc') {
  //       return new Date(a.dueDate) > new Date(b.dueDate) ? -1 : 1;
  //     } else {
  //       return new Date(a.dueDate) < new Date(b.dueDate) ? -1 : 1;
  //     }
  //   })
  // });

  // ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  // console.log("DATA INPUT: ", this.message());
  // const subscription = this.activatedRoute.queryParams.subscribe({
  //   next: (params) => {
  //     this.order.set(params['order']);
  //   }
  // });
  // this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }

  userTasks = input<Task[]>([]);
  order = input<'asc' | 'desc'>('asc');
}


export const resolveUserTasks: ResolveFn<Task[]> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const taskService = inject(TasksService);
  const tasks: Task[] = taskService.allTasks()
    .filter(u => u.userId === activatedRoute.paramMap.get('userId'))
    .sort((a, b) => {
      if (activatedRoute.queryParams['order'] === 'desc') {
        return a.id > b.id ? -1 : 1;
      } else {
        return a.id < b.id ? -1 : 1;
      }
    });

  return tasks.length ? tasks : [];
}