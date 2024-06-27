import { Injectable, inject, runInInjectionContext } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorDisplay {
  constructor(
    private taskService: TaskService,
    private toaster: ToastrService
  ) {}
  errorOcurred(error: HttpErrorResponse) {
    this.taskService.isLoading$.next(false);
    this.toaster.error(error.error.Message);
    debugger
  }
}
