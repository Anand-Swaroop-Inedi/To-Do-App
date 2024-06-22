import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TaskMenuComponent } from '../../shared/components/task-menu/task-menu.component';
import { TaskStatusComponent } from '../../shared/components/task-status/task-status.component';
import { TaskHeaderComponent } from '../../shared/components/task-header/task-header.component';
import { TaskService } from '../../services/task/task.service';
import { Task } from '../../models/Task';
import { GenericService } from '../../services/generic/generic.service';
import { ApiResponse } from '../../models/ApiResponse';
import { WebApiUrls } from '../../shared/end-points/WebApiUrls';

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
export class DashboardComponent implements OnInit, OnChanges {
  name: string = 'dashboard';
  tasks: Task[] = [];
  @Input() changeMenu: boolean = false;
  @ViewChild('taskStatus') taskStatus!: TaskStatusComponent;
  constructor(
    private taskService: TaskService,
    private toaster: ToastrService,
    private genericService:GenericService,
    private apiUrls:WebApiUrls
  ) {}
  ngOnInit() {
    this.getAllTasksData();
  }
  ngOnChanges(): void {
    if (this.changeMenu == true) {
      this.getAllTasksData();
    }
  }
  sendUpdatedData() {
    this.getAllTasksData();
    this.taskStatus.getCompletionpercentage();
  }
  getAllTasksData() {
    this.genericService.get<ApiResponse>(this.apiUrls.getAllTasks).subscribe((response) => {
      if (response.statusCode == 200) {
        this.taskService.taskData$.next(response.result);
      } else {
        this.toaster.error(response.message);
      }
    });
  }
}
