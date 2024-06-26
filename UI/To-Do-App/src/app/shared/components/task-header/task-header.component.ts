import { Component, EventEmitter, Output } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import {
  Router,
  NavigationEnd,
  Event as NavigationEvent,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-header.component.html',
  styleUrl: './task-header.component.scss',
})
export class TaskHeaderComponent {
  pageName: string = '';
  today: Date;
  routerSubscription!:Subscription;
  constructor(private taskService: TaskService, private router: Router) {
    this.today = new Date();
  }
  ngOnInit(): void {
    this.setPageName();
  }
  setPageName() {
    let name = this.router.url.split('/').pop();
    if (name) this.pageName = name[0].toUpperCase() + name.slice(1);
    this.routerSubscription = this.router.events.subscribe(
      (event: NavigationEvent) => {
        if (event instanceof NavigationEnd) {
          let name = event.urlAfterRedirects.split('/').pop();
          if (name) 
            this.pageName = name[0].toUpperCase() + name.slice(1);
        }
      }
    );
  }
  deleteAll() {
    this.taskService.deleteConfirm$.next(0);
  }
}
