import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { TodayDateComponent } from "../today-date/today-date.component";
import { TasksHeaderComponent } from "../tasks-header/tasks-header.component";
import { TaskMenuComponent } from "../task-menu/task-menu.component";
import { TaskStatusComponent } from "../task-status/task-status.component";
import { Task } from '../Models/Task';
import { TaskService } from '../Services/Task/task.service';


@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [CommonModule, TodayDateComponent, TasksHeaderComponent, TaskMenuComponent, TaskStatusComponent]
})
export class DashboardComponent implements OnInit {
    name:string="dashboard";
    tasks:Task[]=[];
    constructor(private taskService:TaskService)
    {

    }
    ngOnInit()
    {
        this.taskService.getAllTasks().subscribe((response)=>{
            if(response.statusCode==200)
            {
                this.taskService.taskData$.next(response.result);
            }
            else
            {
                console.log(response.message)
            }
            
        })
    }
}
