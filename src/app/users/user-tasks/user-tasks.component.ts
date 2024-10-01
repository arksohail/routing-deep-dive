import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user/user.model';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit{
  // userId = input.required<string>();
  userId = signal<string>("");

  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  user?: User;
  // user = computed(() => this.usersService.users.find(u => u.id === this.userId()));

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.activatedRoute);
    const subscription = this.activatedRoute
    .paramMap
    .subscribe({
      next: (paramMap) => {
        const userId = paramMap.get("userId");
        if(userId) {
          this.user = this.usersService.users.find((user) => user.id === userId);
        }
      }
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }
}
