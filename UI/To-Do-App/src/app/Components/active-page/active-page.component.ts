import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TaskMenuComponent } from '../../Shared Scripts/Components/task-menu/task-menu.component';
import { TaskService } from '../../Services/Task/task.service';
import { TaskHeaderComponent } from "../../Shared Scripts/Components/task-header/task-header.component";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-active-page',
    standalone: true,
    templateUrl: './active-page.component.html',
    styleUrl: './active-page.component.scss',
    imports: [ TaskMenuComponent, TaskHeaderComponent]
})
export class ActivePageComponent implements OnInit {
  name: string = 'Active';
  @Input() changeMenu: boolean = false;
  constructor(private taskService: TaskService,private toaster:ToastrService) {}
  ngOnInit() {
    this.getAllTasksData();
  }
  ngOnChanges(): void {
    if (this.changeMenu == true) {
      this.getAllTasksData();
    }
  }
  sendUpdatedData() {
    this.getAllTasksData();
  }
  getAllTasksData() {
    this.taskService.getActiveTasks().subscribe((response) => {
      if (response.statusCode == 200) {
        this.taskService.taskData$.next(response.result);
      } else {
        this.toaster.error(response.message);
      }
    });
  }
}
