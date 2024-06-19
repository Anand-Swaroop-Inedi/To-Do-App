import { Component, Input, OnChanges } from '@angular/core';
import { TodayDateComponent } from "../today-date/today-date.component";
import { CommonModule } from '@angular/common';
import { TaskService } from '../Services/Task/task.service';

@Component({
    selector: 'app-tasks-header',
    standalone: true,
    templateUrl: './tasks-header.component.html',
    styleUrl: './tasks-header.component.scss',
    imports: [TodayDateComponent,CommonModule]
})
export class TasksHeaderComponent {
    @Input() pageName:string='dashboard'
    constructor(private taskService:TaskService)
    {}
    ngOnChanges()
    {
        console.log(this.pageName);
    }
    deleteAll()
    {
        this.taskService.deleteAllTasks().subscribe((response)=>{
                console.log(response.message);
        })
    }
}
