import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../services/task/task.service';
import { response } from 'express';
import { ApiResponse } from '../../../models/ApiResponse';
import { WebApiUrls } from '../../end-points/WebApiUrls';
import { GenericService } from '../../../services/generic/generic.service';

@Component({
  selector: 'app-task-status',
  standalone: true,
  imports: [],
  templateUrl: './task-status.component.html',
  styleUrl: './task-status.component.scss',
})
export class TaskStatusComponent implements OnInit {
  completionPercentage: number = 0;
  activePercentage: number = 0;
  constructor(private taskService: TaskService,private apiUrls:WebApiUrls,private genericService:GenericService) {}
  ngOnInit() {
    this.taskService.isDashboardManipulted$.subscribe((response) => {
      if (response) {
        this.getCompletionpercentage();
      }
    });
    this.getCompletionpercentage();
  }
  getCompletionpercentage() {
    this.genericService
      .get<ApiResponse>(this.apiUrls.getCompletionPercentage)
      .subscribe((response: ApiResponse) => {
        if (response.statusCode == 200) {
          this.completionPercentage = response.result[0];
          this.activePercentage = response.result[1];
        }
      });
  }
}
