import { Component, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { ToastrService } from 'ngx-toastr';
import { TaskHeaderComponent } from '../../shared/components/task-header/task-header.component';
import { TaskMenuComponent } from '../../shared/components/task-menu/task-menu.component';
import { WebApiUrls } from '../../shared/end-points/WebApiUrls';
import { GenericService } from '../../services/generic/generic.service';
import { ApiResponse } from '../../models/ApiResponse';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-active',
  standalone: true,
  templateUrl: './active.component.html',
  styleUrl: './active.component.scss',
  imports: [TaskHeaderComponent, TaskMenuComponent],
})
export class ActiveComponent implements OnInit,OnDestroy,OnChanges {
  name: string = 'Active';
  @Input() changeMenu: boolean = false;
  genericServiceSubscription!:Subscription;
  constructor(
    private taskService: TaskService,
    private toaster: ToastrService,
    private apiUrls: WebApiUrls,
    private genericService: GenericService
  ) {}
  ngOnInit() {
    this.checkPageManipulated();
    this.getActiveTasksData();
  }

  ngOnChanges(): void {
    if (this.changeMenu == true) {
      this.getActiveTasksData();
    }
  }
  checkPageManipulated()
  {
    this.taskService.pageManiulated$.subscribe((response)=>{
      if(response=="active")
      {
        this.sendUpdatedData();
      }
    });
  }
  sendUpdatedData() {
    this.getActiveTasksData();
  }
  getActiveTasksData() {
    this.taskService.isLoading$.next(true);
    this.genericServiceSubscription=this.genericService
      .get<ApiResponse>(this.apiUrls.getActiveTasks)
      .subscribe((response) => {
        this.taskService.isLoading$.next(false);
        if (response.statusCode == 200) {
          this.taskService.taskData$.next(response.result);
        } else {
          this.toaster.error(response.message);
        }
      });
  }
  ngOnDestroy(): void {
      this.genericServiceSubscription.unsubscribe();
  }
}
