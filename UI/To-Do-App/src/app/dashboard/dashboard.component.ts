import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
    imports: [CommonModule, TasksHeaderComponent, TaskMenuComponent, TaskStatusComponent]
})
export class DashboardComponent implements OnInit,OnChanges {
    name:string="dashboard";
    tasks:Task[]=[];
    @Input() changeMenu:boolean=false;
    @ViewChild('taskStatus') taskStatus!:TaskStatusComponent;
    constructor(private taskService:TaskService)
    {

    }
    ngOnInit()
    {
        this.getAllTasksData();
    }
    ngOnChanges(): void {
        if(this.changeMenu==true)
        {
            this.getAllTasksData();
        }
    }
    sendUpdatedData()
    {
        this.getAllTasksData();
        this.taskStatus.getCompletionpercentage();
    }
    getAllTasksData()
    {
        this.taskService.getAllTasks().subscribe((response)=>{
            if(response.statusCode==200)
            {
                this.taskService.taskData$.next(response.result);
            }
            else{
                console.log(response.message);
            }
    });
    }
}
