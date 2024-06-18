import { Component, Input, OnChanges } from '@angular/core';
import { TodayDateComponent } from "../today-date/today-date.component";

@Component({
    selector: 'app-tasks-header',
    standalone: true,
    templateUrl: './tasks-header.component.html',
    styleUrl: './tasks-header.component.scss',
    imports: [TodayDateComponent]
})
export class TasksHeaderComponent {
    @Input() name:string=''
}
