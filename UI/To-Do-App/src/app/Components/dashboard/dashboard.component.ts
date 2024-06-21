import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TaskMenuComponent } from '../../shared/Components/task-menu/task-menu.component';
import { TaskStatusComponent } from '../../shared/Components/task-status/task-status.component';
import { TaskHeaderComponent } from '../../shared/Components/task-header/task-header.component';
import { TaskService } from '../../services/task/task.service';
import { Task } from '../../models/Task';

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
    private toaster: ToastrService
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
    this.taskService.getAllTasks().subscribe((response) => {
      if (response.statusCode == 200) {
        this.taskService.taskData$.next(response.result);
      } else {
        this.toaster.error(response.message);
      }
    });
  }
}
