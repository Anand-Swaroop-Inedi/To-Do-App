import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TaskMenuComponent } from '../../shared/components/task-menu/task-menu.component';
import { TaskStatusComponent } from '../../shared/components/task-status/task-status.component';
import { TaskHeaderComponent } from '../../shared/components/task-header/task-header.component';
import { TaskService } from '../../services/task/task.service';
import { Task } from '../../models/Task';
import { ApiResponse } from '../../models/ApiResponse';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [
    CommonModule,
    TaskMenuComponent,
    TaskStatusComponent,
    TaskHeaderComponent,
  ],
})
export class DashboardComponent implements OnInit, OnChanges,OnDestroy {
  name: string = 'dashboard';
  tasks: Task[] = [];
  @Input() changeMenu: boolean = false;
  @ViewChild('taskStatus') taskStatus!: TaskStatusComponent;
  pageManiulatedSubscribtion!:Subscription;
  taskServiceSubscription!:Subscription;
  constructor(
    private taskService: TaskService,
    private toaster: ToastrService,
  ) {}
  ngOnInit() {
    this.checkDashboardManipulated();
    this.getAllTasksData();
  }
  ngOnChanges(): void {
    if (this.changeMenu == true) {
      this.getAllTasksData();
    }
  }
  checkDashboardManipulated()
  {
    this.pageManiulatedSubscribtion=this.taskService.pageManiulated$.subscribe((value)=>{
      if(value=='dashboard')
      {
        this.sendUpdatedData();
      }
    });
  }
  sendUpdatedData() {
    this.getAllTasksData();
    this.taskStatus.getCompletionpercentage();
  }
  getAllTasksData() {
    this.taskService.isLoading$.next(true);
    this.taskServiceSubscription=this.taskService.getAllTasks<ApiResponse>().subscribe((response) => {
      this.taskService.isLoading$.next(false);
      if (response.statusCode == 200) {
        this.taskService.taskData$.next(response.result);
      } else {
        this.toaster.error(response.message);
      }
    });
  }
  ngOnDestroy()
  {
    this.taskServiceSubscription.unsubscribe();
    this.pageManiulatedSubscribtion.unsubscribe();
  }
}
