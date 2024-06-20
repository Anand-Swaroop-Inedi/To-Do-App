import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../Services/Task/task.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tasks-header',
    standalone: true,
    templateUrl: './tasks-header.component.html',
    styleUrl: './tasks-header.component.scss',
    imports: [CommonModule]
})
export class TasksHeaderComponent implements OnInit{
    pageName:string=''
    @Output() dataManipulated:EventEmitter<boolean>=new EventEmitter<boolean>();
    today:Date;
    constructor(private taskService:TaskService,private router:Router)
    {
        this.today = new Date();
    }
    ngOnInit(): void {
    {
        let name:string|undefined=this.router.url.split('/').pop();
        if(name)
        this.pageName=name[0].toUpperCase()+name.slice(1);
    }
    }
    deleteAll()
    {
        this.taskService.deleteAllTasks().subscribe((response)=>{
                this.dataManipulated.emit(true);
                this.taskService.isDashboardManipulted$.next(true);
        });
    }
}
