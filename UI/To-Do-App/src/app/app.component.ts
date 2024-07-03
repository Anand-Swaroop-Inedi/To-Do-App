import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { TaskService } from './services/task/task.service';
import { CommonModule } from '@angular/common';
import { NotifyMessageComponent } from './shared/components/notify-message/notify-message.component';
import { Subscription, interval } from 'rxjs';

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
  isNotify: boolean = false;
  message: string = '';
  sub!: Subscription;
  constructor(
    private taskService: TaskService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    localStorage.clear();
    this.notifyMessages();
    this.taskService.isLoading$.subscribe((value) => {
      this.isLoading = value;
      this.cdr.detectChanges();
    });
  }
  notifyMessages() {
      this.sub = interval(60000).subscribe((t) => {
        var  keys = Object.keys(localStorage);
        var  i = keys.length;
        while (i--) {
          var arr: string[] = localStorage.getItem(keys[i])!.split(',');
          const parsedDateTime = new Date(arr[1]);
          const currentDateTime = new Date();
          if (parsedDateTime <= currentDateTime) {
            setTimeout(() => {
              this.isNotify = false;
            }, 3000);
            this.message = arr[0];
            this.isNotify = true;
            var  k = Object.keys(localStorage);
            localStorage.removeItem(keys[i]);
            k
            k= Object.keys(localStorage);
            this.taskService.notificationMessage$.next([arr[0],'add']);
          }
        }
      });    
  }
}
