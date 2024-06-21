import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { TaskMenuComponent } from '../../shared/Components/task-menu/task-menu.component';
import { TaskHeaderComponent } from '../../shared/Components/task-header/task-header.component';

@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [TaskMenuComponent, TaskHeaderComponent],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.scss'
})
export class CompletedComponent implements OnInit {
  constructor(private taskService: TaskService) {}
  ngOnInit() {
    this.getCompletedTasksData();
  }
  sendUpdatedData() {
    this.getCompletedTasksData();
  }

  getCompletedTasksData() {
    this.taskService.getCompletedTasks().subscribe((response) => {
      if (response.statusCode == 200) {
        this.taskService.taskData$.next(response.result);
      }
    });
  }
}

