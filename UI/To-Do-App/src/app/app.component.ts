import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { TaskService } from './services/task/task.service';
import { CommonModule } from '@angular/common';
import { NotifyMessageComponent } from './shared/components/notify-message/notify-message.component';
import { Subscription, interval } from 'rxjs';
import { ErrorDisplay } from './shared/exception-handling/exception-handle';
import { NotificationsComponent } from './shared/components/notifications/notifications.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    SpinnerComponent,
    CommonModule,
    NotifyMessageComponent,
  ],
})
export class AppComponent implements OnInit {
  title = 'To-Do-App';
  isLoading: boolean = false;

  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit() {
    localStorage.clear();
    this.taskService.isLoading$.subscribe((value) => {
      this.isLoading = value;
      this.cdr.detectChanges();
    });
  }
  
}
