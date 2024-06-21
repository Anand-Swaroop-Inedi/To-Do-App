import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { ToastrService } from 'ngx-toastr';
import { TaskHeaderComponent } from '../../shared/Components/task-header/task-header.component';
import { TaskMenuComponent } from '../../shared/Components/task-menu/task-menu.component';
@Component({
    selector: 'app-active',
    standalone: true,
    templateUrl: './active.component.html',
    styleUrl: './active.component.scss',
    imports: [TaskHeaderComponent, TaskMenuComponent]
})
export class ActiveComponent  implements OnInit {
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
