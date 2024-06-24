import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { ToastrService } from 'ngx-toastr';
import { SideBarComponent } from '../layout/side-bar/side-bar.component';
import { HeaderComponent } from '../layout/header/header.component';
import { SideBarMobileComponent } from '../layout/side-bar-mobile/side-bar-mobile.component';
import { Router, RouterModule } from '@angular/router';
import { AddTaskComponent } from '../../shared/components/add-task/add-task.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { WebApiUrls } from '../../shared/end-points/WebApiUrls';
import { GenericService } from '../../services/generic/generic.service';
import { ApiResponse } from '../../models/ApiResponse';
import { DeleteConfirmationComponent } from "../../shared/components/delete-confirmation/delete-confirmation.component";
import { Subscription } from 'rxjs';
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
        DeleteConfirmationComponent
    ]
})
export class HomeComponent implements OnInit,OnDestroy {
  pageName: string = '';
  @ViewChild('addTask') addTaskRef!: ElementRef<HTMLInputElement>;
  @ViewChild('deleteConfirmation') deleteConfirmationRef!: ElementRef<HTMLInputElement>;
  @ViewChild('home') homeDivRef!: ElementRef<HTMLInputElement>;
  isNewTaskAdded: boolean = false;
  deleteItemId!:number;
  editTaskSubscribtion!:Subscription;
  deleteTaskSubscription!:Subscription;
  constructor(
    private router: Router,
    private taskService: TaskService,
    private toaster: ToastrService,
    private apiUrls: WebApiUrls,
    private genericService: GenericService
  ) {}
  ngOnInit() {
    this.checkEditButtonClicked()
    this.checkDeleteButtonClicked()
  }
  checkEditButtonClicked()
  {
    this.editTaskSubscribtion=this.taskService.editTask$.subscribe((value) => {
      if (value != null) {
        this.openAddTaskContainer();
      }
    });
  }
  checkDeleteButtonClicked()
  {
    this.deleteTaskSubscription=this.taskService.deleteConfirm$.subscribe((value)=>{
      this.openDeleteConfirmContainer(value);
  });
  }
  openDeleteConfirmContainer(id:number) {
    this.deleteItemId=id;
    this.deleteConfirmationRef.nativeElement.style.display = 'block';
    this.homeDivRef.nativeElement.classList.add('blur');
  }
  openAddTaskContainer() {
    this.addTaskRef.nativeElement.style.display = 'block';
    this.homeDivRef.nativeElement.classList.add('blur');
  }
  closeDeleteConfirmContainer()
  {
    this.deleteConfirmationRef.nativeElement.style.display = 'none';
    this.homeDivRef.nativeElement.classList.remove('blur');
  }
  closeAddTaskContainer(count: number) {
    this.addTaskRef.nativeElement.style.display = 'none';
    this.homeDivRef.nativeElement.classList.remove('blur');
    if (count > 0) {
      let pgName: string | undefined = this.router.url.split('/').pop();
      this.taskService.isLoading$.next(true);
      if (pgName == 'dashboard') {
        this.changeDashboardContent();
      } else {
        this.changeActivePageContent();
      }
    }
  }
  changeDashboardContent()
  {
    this.taskService.pageManiulated$.next('dashboard');
    this.genericService.get<ApiResponse>(this.apiUrls.getAllTasks).subscribe((response) => {
      this.taskService.isLoading$.next(false);
      if (response.statusCode == 200) {
        this.taskService.taskData$.next(response.result);
      } else {
        this.toaster.error(response.message);
      }
    });
  }
  changeActivePageContent()
  {
    this.genericService.get<ApiResponse>(this.apiUrls.getActiveTasks).subscribe((response) => {
      this.taskService.isLoading$.next(false);
      if (response.statusCode == 200) {
        this.taskService.taskData$.next(response.result);
      } else {
        this.toaster.error(response.message);
      }
    });
  }
  ngOnDestroy()
  {
    this.editTaskSubscribtion.unsubscribe();
    this.deleteTaskSubscription.unsubscribe();
  }
}
