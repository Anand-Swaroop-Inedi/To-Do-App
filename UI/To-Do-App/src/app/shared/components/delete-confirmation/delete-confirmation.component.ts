import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiResponse } from '../../../models/ApiResponse';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../../../services/task/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.scss',
})
export class DeleteConfirmationComponent {
  @Input() id!: number;
  @Output() close: EventEmitter<null> = new EventEmitter<null>();
  constructor(
    private taskService: TaskService,
    private toaster: ToastrService,
    private router:Router
  ) {}
  onCancel() {
    this.close.emit();
  }
  onDelete() {
    if (this.id == 0) {
      this.DeleteAll()
    }
    else{
      this.DeleteSingleTask();
    }
  }
  DeleteAll()
  {
    this.taskService.isLoading$.next(true);
    this.taskService
      .deleteAllTasks<ApiResponse>()
      .subscribe((response) => {
        this.taskService.isLoading$.next(false);
        if (response.statusCode == 200) {
          this.taskService.pageManiulated$.next('dashboard');
          this.toaster.success(response.message);
        } else {
          this.toaster.error(response.message);
        }
        this.onCancel();
      });
  }
  DeleteSingleTask()
  {
    this.taskService.isLoading$.next(true);
    this.taskService.deleteTask<ApiResponse>(this.id).subscribe((response) => {
      this.taskService.isLoading$.next(false);
      if (response.statusCode == 200) {
        const url=this.router.url.split('/').pop();
        if(url)
        {
          this.taskService.pageManiulated$.next(url);
        }
        this.toaster.success(response.message);
      } else {
        this.toaster.error(response.message);
      }
      this.onCancel();
    });
  }
}
