import { Component } from '@angular/core';
import { TasksHeaderComponent } from "../tasks-header/tasks-header.component";
import { TaskMenuComponent } from "../task-menu/task-menu.component";

@Component({
    selector: 'app-completed-page',
    standalone: true,
    templateUrl: './completed-page.component.html',
    styleUrl: './completed-page.component.scss',
    imports: [TasksHeaderComponent, TaskMenuComponent]
})
export class CompletedPageComponent {
  name:string="Completed";
}
