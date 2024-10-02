import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet, RouterStateSnapshot } from '@angular/router';
import { User } from '../user/user.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink]
})
export class UserTasksComponent implements OnInit {
  // userId = input.required<string>();
  userId = signal<string>("");

  // private usersService = inject(UsersService);
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);

  userName = input.required<string>();
  // user = computed(() => this.usersService.users.find(u => u.id === this.userId()));
  // userName?: string;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // console.log(this.activatedRoute.snapshot.params["userId"]);
    // console.log(this.activatedRoute.snapshot.paramMap.get("userId"));
    // const subscription = this.activatedRoute
    // .paramMap
    // .subscribe({
    //   next: (paramMap) => {
    //     const userId = paramMap.get("userId");
    //     if(userId) {
    //       this.user = this.usersService.users.find((user) => user.id === userId);
    //     }
    //   }
    // });

    // this.destroyRef.onDestroy(() => subscription.unsubscribe())

    // const subscription = this.activatedRoute
    //   .data
    //   .subscribe({
    //     next: (data) => {
    //       const message = data['message'];
    //       const userName = data['userName'];
    //       console.log(message);
    //       console.log(userName);
          
    //       this.userName = userName;
    //     }
    //   });

    // this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }
}


export const resolveUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const userService = inject(UsersService);
  const userName = userService.users.find((user) => user.id === activatedRoute.paramMap.get("userId"))?.name || '';
  return userName;
}