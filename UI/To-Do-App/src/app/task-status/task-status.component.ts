import { Component, OnInit } from '@angular/core';
import { TaskService } from '../Services/Task/task.service';
import { response } from 'express';
import { ApiResponse } from '../Models/ApiResponse';

@Component({
  selector: 'app-task-status',
  standalone: true,
  imports: [],
  templateUrl: './task-status.component.html',
  styleUrl: './task-status.component.scss'
})
export class TaskStatusComponent implements OnInit {
  completionPercentage:number=0;
  activePercentage:number=0;
  constructor(private taskService:TaskService)
  {}
  ngOnInit()
  {
    this.taskService.isDashboardManipulted$.subscribe((response)=>{
      if(response)
      {
        console.log(response);
        this.getCompletionpercentage();
      }
    });
    this.getCompletionpercentage();
  }
  getCompletionpercentage()
  {
    this.taskService.getCompletionpercentage().subscribe((response:ApiResponse)=>{
      if(response.statusCode==200)
      {
          this.completionPercentage=response.result[0];
          this.activePercentage=response.result[1];
      }
    });
  }
}
