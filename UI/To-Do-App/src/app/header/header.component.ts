import { Component, Input } from '@angular/core';
import { AddTaskComponent } from "../add-task/add-task.component";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [AddTaskComponent]
})
export class HeaderComponent {
  @Input() pageName:string='';
}
