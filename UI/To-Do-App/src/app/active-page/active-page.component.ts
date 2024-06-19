import { Component, OnInit } from '@angular/core';
import { TasksHeaderComponent } from "../tasks-header/tasks-header.component";
import { TaskMenuComponent } from "../task-menu/task-menu.component";
import { TaskService } from '../Services/Task/task.service';

@Component({
    selector: 'app-active-page',
    standalone: true,
    templateUrl: './active-page.component.html',
    styleUrl: './active-page.component.scss',
    imports: [TasksHeaderComponent, TaskMenuComponent]
})
export class ActivePageComponent implements OnInit {
  name:string="Active";
  constructor(private taskService:TaskService)
  {

  }
  ngOnInit()
  {
    this.taskService.getActiveTasks().subscribe((response)=>{
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
