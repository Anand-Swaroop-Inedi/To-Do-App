import { Component, OnInit } from '@angular/core';
import { TasksHeaderComponent } from "../tasks-header/tasks-header.component";
import { TaskMenuComponent } from "../task-menu/task-menu.component";
import { TaskService } from '../Services/Task/task.service';

@Component({
    selector: 'app-completed-page',
    standalone: true,
    templateUrl: './completed-page.component.html',
    styleUrl: './completed-page.component.scss',
    imports: [TasksHeaderComponent, TaskMenuComponent]
})
export class CompletedPageComponent implements OnInit {
  constructor(private taskService:TaskService)
  {

  }
  ngOnInit(){
    this.getCompletedTasksData();
  }
  sendUpdatedData()
    {
      this.getCompletedTasksData();
    }
        
    getCompletedTasksData()
    {
      this.taskService.getCompletedTasks().subscribe((response)=>{
        if(response.statusCode==200)
        {
            this.taskService.taskData$.next(response.result);
        }
      });
    }
}
