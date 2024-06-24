import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { ApiResponse } from '../../../models/ApiResponse';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-status',
  standalone: true,
  imports: [],
  templateUrl: './task-status.component.html',
  styleUrl: './task-status.component.scss',
})
export class TaskStatusComponent implements OnInit,OnDestroy {
  completionPercentage: number = 0;
  activePercentage: number = 0;
  taskServiceSubscription!:Subscription;
  constructor(private taskService: TaskService) {}
  ngOnInit() {
    this.getDataChanges();
    this.getCompletionpercentage();
  }
  getDataChanges()
  {
    this.taskService.pageManiulated$.subscribe((response) => {
      if (response=='dashboard') {
        this.getCompletionpercentage();
      }
    });
  }
  getCompletionpercentage() {
    this.taskService.isLoading$.next(true);
    this.taskServiceSubscription=this.taskService
      .getCompletionpercentage<ApiResponse>()
      .subscribe((response: ApiResponse) => {
        this.taskService.isLoading$.next(false);
        if (response.statusCode == 200) {
          this.completionPercentage = response.result[0];
          this.activePercentage = response.result[1];
        }
      });
  }
  ngOnDestroy()
  {
    this.taskServiceSubscription.unsubscribe();
  }
}
