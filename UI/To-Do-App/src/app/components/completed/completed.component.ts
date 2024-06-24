import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { TaskMenuComponent } from '../../shared/components/task-menu/task-menu.component';
import { TaskHeaderComponent } from '../../shared/components/task-header/task-header.component';
import { WebApiUrls } from '../../shared/end-points/WebApiUrls';
import { GenericService } from '../../services/generic/generic.service';
import { ApiResponse } from '../../models/ApiResponse';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [TaskMenuComponent, TaskHeaderComponent],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.scss'
})
export class CompletedComponent implements OnInit,OnDestroy {
  pageManiulatedSubscribtion!:Subscription;
  genericServiceSubscription!:Subscription;
  constructor(private taskService: TaskService,private apiUrls:WebApiUrls,private genericService:GenericService) {}
  ngOnInit() {
    this.checkChangesMade();
    this.getCompletedTasksData();
  }
  checkChangesMade()
  {
    this.pageManiulatedSubscribtion=this.taskService.pageManiulated$.subscribe((response)=>{
      if(response=="completed")
      {
        this.sendUpdatedData();
      }
    });
  }
  sendUpdatedData() {
    this.getCompletedTasksData();
  }

  getCompletedTasksData() {
    this.taskService.isLoading$.next(true);
    this.genericServiceSubscription=this.genericService.get<ApiResponse>(this.apiUrls.getCompletedTasks).subscribe((response) => {
      this.taskService.isLoading$.next(false);
      if (response.statusCode == 200) {
        this.taskService.taskData$.next(response.result);
      }
    });
  }
  ngOnDestroy()
  {
    this.genericServiceSubscription.unsubscribe();
    this.pageManiulatedSubscribtion.unsubscribe();
  }
}

