import { Component, Input } from '@angular/core';
import { TodayDateComponent } from "../today-date/today-date.component";
import { Task } from '../Models/Task';
import { TaskService } from '../Services/Task/task.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-task-menu',
    standalone: true,
    templateUrl: './task-menu.component.html',
    styleUrl: './task-menu.component.scss',
    imports: [TodayDateComponent,CommonModule]
})
export class TaskMenuComponent {
    tasks:Task[]=[];
    @Input() name:string='dashboard';
    constructor(private taskService:TaskService)
    {

    }
    ngOnInit()
    {
        this.taskService.taskData$.subscribe((value)=>{
            this.tasks=value;
        })
    }
    makeCheck(index:number)
    {
        var taskDetail=document.getElementsByClassName('task-item-info') as HTMLCollectionOf<HTMLInputElement>;
        console.log(taskDetail[index].style.display);
        taskDetail[index].style.display=taskDetail[index].style.display=="none" ||taskDetail[index].style.display==""?'flex':'none';
        for(let i=0;i<taskDetail.length;i++)
        {
            if(i!=index)
            taskDetail[i].style.display='none';
        }
    }
    delete(id:number)
    {
        this.taskService.deleteTask(id).subscribe((response)=>{
            console.log(response.message)
        })
    }
    makeCompleted(id:number)
    {
        debugger;
        console.log(this.name)
        if(this.name.toLowerCase()=='active')
        {
            this.taskService.makeAsCompleted(id).subscribe((response)=>{
                console.log(response.message);
            });
        }
    }
}
