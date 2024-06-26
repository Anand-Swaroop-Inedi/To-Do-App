import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { SideBarComponent } from '../layout/side-bar/side-bar.component';
import { HeaderComponent } from '../layout/header/header.component';
import { SideBarMobileComponent } from '../layout/side-bar-mobile/side-bar-mobile.component';
import { RouterModule } from '@angular/router';
import { AddTaskComponent } from '../../shared/components/add-task/add-task.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DeleteConfirmationComponent } from '../../shared/components/delete-confirmation/delete-confirmation.component';
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
    DeleteConfirmationComponent,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  pageName: string = '';
  @ViewChild('addTask') addTaskRef!: ElementRef<HTMLInputElement>;
  @ViewChild('deleteConfirmation')
  deleteConfirmationRef!: ElementRef<HTMLInputElement>;
  @ViewChild('home') homeDivRef!: ElementRef<HTMLInputElement>;
  deleteItemId!: number;
  editTaskSubscribtion!: Subscription;
  deleteTaskSubscription!: Subscription;
  constructor(
    private taskService: TaskService,
  ) {}
  ngOnInit() {
    this.checkEditButtonClicked();
    this.checkDeleteButtonClicked();
  }
  checkEditButtonClicked() {
    this.editTaskSubscribtion = this.taskService.editTask$.subscribe(
      (value) => {
        if (value != null) {
          this.openAddTaskContainer();
        }
      }
    );
  }
  checkDeleteButtonClicked() {
    this.deleteTaskSubscription = this.taskService.deleteConfirm$.subscribe(
      (value) => {
        this.openDeleteConfirmContainer(value);
      }
    );
  }
  openDeleteConfirmContainer(id: number) {
    this.deleteItemId = id;
    this.deleteConfirmationRef.nativeElement.style.display = 'block';
    this.homeDivRef.nativeElement.classList.add('blur');
    this.homeDivRef.nativeElement.style.pointerEvents = 'none';
  }
  openAddTaskContainer() {
    this.addTaskRef.nativeElement.style.display = 'block';
    this.homeDivRef.nativeElement.classList.add('blur');
    this.homeDivRef.nativeElement.style.pointerEvents = 'none';
  }
  closeDeleteConfirmContainer() {
    this.deleteConfirmationRef.nativeElement.style.display = 'none';
    this.homeDivRef.nativeElement.classList.remove('blur');
    this.homeDivRef.nativeElement.style.pointerEvents = 'auto';
  }
  closeAddTaskContainer() {
    this.addTaskRef.nativeElement.style.display = 'none';
    this.homeDivRef.nativeElement.classList.remove('blur');
    this.homeDivRef.nativeElement.style.pointerEvents = 'auto';
  }
  ngOnDestroy() {
    this.editTaskSubscribtion.unsubscribe();
    this.deleteTaskSubscription.unsubscribe();
  }
}
