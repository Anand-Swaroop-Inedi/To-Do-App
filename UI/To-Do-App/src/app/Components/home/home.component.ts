import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { ToastrService } from 'ngx-toastr';
import { SideBarComponent } from '../layout/side-bar/side-bar.component';
import { HeaderComponent } from '../layout/header/header.component';
import { SideBarMobileComponent } from '../layout/side-bar-mobile/side-bar-mobile.component';
import { Router, RouterModule } from '@angular/router';
import { AddTaskComponent } from '../../shared/Components/add-task/add-task.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    SideBarComponent,
    HeaderComponent,
    DashboardComponent,
    SideBarMobileComponent,
    RouterModule,
    AddTaskComponent,
  ],
})
export class HomeComponent implements OnInit {
  pageName: string = '';
  @ViewChild('addTask') addTaskRef!: ElementRef<HTMLInputElement>;
  @ViewChild('home') homeDivRef!: ElementRef<HTMLInputElement>;
  isNewTaskAdded: boolean = false;
  constructor(
    private router: Router,
    private taskService: TaskService,
    private toaster: ToastrService
  ) {}
  ngOnInit() {
    this.taskService.editTask$.subscribe((value) => {
      if (value != null) {
        this.openAddTaskContainer();
      }
    });
  }
  openAddTaskContainer() {
    this.addTaskRef.nativeElement.style.display = 'block';
    this.homeDivRef.nativeElement.classList.add('blur');
  }
  closeAddTaskContainer(count: number) {
    this.addTaskRef.nativeElement.style.display = 'none';
    this.homeDivRef.nativeElement.classList.remove('blur');
    if (count > 0) {
      let pgName: string | undefined = this.router.url.split('/').pop();
      if (pgName == 'dashboard') {
        this.taskService.isDashboardManipulted$.next(true);
        this.taskService.getAllTasks().subscribe((response) => {
          if (response.statusCode == 200) {
            this.taskService.taskData$.next(response.result);
          } else {
            this.toaster.error(response.message);
          }
        });
      } else {
        this.taskService.getActiveTasks().subscribe((response) => {
          if (response.statusCode == 200) {
            this.taskService.taskData$.next(response.result);
          } else {
            this.toaster.error(response.message);
          }
        });
      }
    }
  }
}
