import { Component } from '@angular/core';
import { TaskHeaderComponent } from "../../shared/components/task-header/task-header.component";
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task/task.service';
import { TaskMenuComponent } from "../../shared/components/task-menu/task-menu.component";
import { ApiResponse } from '../../models/ApiResponse';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-pending',
    standalone: true,
    templateUrl: './pending.component.html',
    styleUrl: './pending.component.scss',
    imports: [TaskHeaderComponent, TaskMenuComponent]
})
export class PendingComponent {
  pendingTasks!:Task[];
  pageManiulatedSubscribtion!:Subscription;
  constructor(private taskService:TaskService,private toaster: ToastrService)
  {

  }
  ngOnInit()
  {
    this.checkPendingDataManipulated();
    this.sendUpdatedData()
  }
  checkPendingDataManipulated() {
    this.pageManiulatedSubscribtion =
      this.taskService.pageManiulated$.subscribe((value) => {
        if (value.toLowerCase() == 'pending') {
          this.sendUpdatedData();
        }
      });
  }
  sendUpdatedData()
  {
    this.taskService.isLoading$.next(true);
    this.taskService.getPendingTasks<ApiResponse>().subscribe({next:(response:ApiResponse)=>{
      this.taskService.isLoading$.next(false);
      this.pendingTasks=response.result
    },
    error: (error) => {
      this.taskService.isLoading$.next(false);
      this.toaster.error('Something went wrong. Please try again.');
    },
  })
  }
}
