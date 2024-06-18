import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { TodayDateComponent } from "../today-date/today-date.component";
import { TasksHeaderComponent } from "../tasks-header/tasks-header.component";
import { TaskMenuComponent } from "../task-menu/task-menu.component";
import { TaskStatusComponent } from "../task-status/task-status.component";


@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [CommonModule, TodayDateComponent, TasksHeaderComponent, TaskMenuComponent, TaskStatusComponent]
})
export class DashboardComponent {
    name:string="dashboard";
}
