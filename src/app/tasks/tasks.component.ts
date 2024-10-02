import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  userId = input.required<string>(); // Only accesible using the withRouterConfig({paramsInheritanceStrategy: 'always'})
  order?: 'asc' | 'desc';
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private taskService = inject(TasksService);
  userTasks = computed(() => this.taskService.allTasks().filter(u => u.userId === this.userId()));

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const subscription = this.activatedRoute.queryParams.subscribe({
      next: (params) => this.order = params['order']
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

}
