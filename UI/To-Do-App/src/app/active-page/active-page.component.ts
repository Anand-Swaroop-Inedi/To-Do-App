import { Component } from '@angular/core';
import { TasksHeaderComponent } from "../tasks-header/tasks-header.component";
import { TaskMenuComponent } from "../task-menu/task-menu.component";

@Component({
    selector: 'app-active-page',
    standalone: true,
    templateUrl: './active-page.component.html',
    styleUrl: './active-page.component.scss',
    imports: [TasksHeaderComponent, TaskMenuComponent]
})
export class ActivePageComponent {
  name:string='Active';
}
