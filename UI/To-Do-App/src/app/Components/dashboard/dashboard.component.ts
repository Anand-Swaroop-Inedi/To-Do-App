import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TaskMenuComponent } from '../../shared/components/task-menu/task-menu.component';
import { TaskStatusComponent } from '../../shared/components/task-status/task-status.component';
import { TaskHeaderComponent } from '../../shared/components/task-header/task-header.component';
import { TaskService } from '../../services/task/task.service';
import { Task } from '../../models/Task';
import { GenericService } from '../../services/generic/generic.service';
import { ApiResponse } from '../../models/ApiResponse';
import { WebApiUrls } from '../../shared/end-points/WebApiUrls';
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
  genericServiceSubscription!:Subscription;
  constructor(
    private taskService: TaskService,
    private toaster: ToastrService,
    private genericService:GenericService,
    private apiUrls:WebApiUrls
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
    this.genericServiceSubscription=this.genericService.get<ApiResponse>(this.apiUrls.getAllTasks).subscribe((response) => {
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
    this.genericServiceSubscription.unsubscribe();
    this.pageManiulatedSubscribtion.unsubscribe();
  }
}
