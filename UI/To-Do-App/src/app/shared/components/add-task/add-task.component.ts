import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../../services/task/task.service';
import { Task } from '../../../models/Task';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorComponent } from 'c:/Users/anand.i/Downloads/To-Do App/UI/To-Do-App/src/app/shared/components/error/error.component';
import { ApiResponse } from '../../../models/ApiResponse';
import { Subscription, tap } from 'rxjs';
import { message } from '../../enums/response';
import { ErrorDisplay } from '../../exception-handling/exception-handle';
@Component({
  selector: 'app-add-task',
  standalone: true,
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
  imports: [ReactiveFormsModule, CommonModule, ErrorComponent],
})
export class AddTaskComponent {
  @Output() close: EventEmitter<null> = new EventEmitter<null>();
  taskForm!: FormGroup;
  isSubmitted: boolean = false;
  isEdit: boolean = false;
  editableTask!: Task;
  requiredMessage: string = 'This Field is Required';
  editTaskSubscribtion!: Subscription;
  constructor(
    private taskService: TaskService,
    private toaster: ToastrService,
    private router:Router,
    private errorDisplay:ErrorDisplay
  ) {}
  ngOnInit() {
    this.getDataIfEdit();
    this.createForm();
  }
  createForm() {
    this.taskForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }
  getDataIfEdit() {
    this.editTaskSubscribtion = this.taskService.editTask$.subscribe(
      (value) => {
        this.taskForm.patchValue({
          name: value.name,
          description: value.description,
        });
        this.editableTask = value;
        this.isEdit = true;
      }
    );
  }
  onCancel() {
    this.isEdit=false;
    let control: AbstractControl;
    this.taskForm.reset();
    this.taskForm.markAsUntouched();
    Object.keys(this.taskForm.controls).forEach((name) => {
      control = this.taskForm.controls[name];
      control.setErrors(null);
    });
    this.close.emit();
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.taskForm.valid) {
      this.taskService.isLoading$.next(true);
      debugger;
      if (!this.isEdit) {
        this.createTask();
      } else {
        this.editTask();
      }
    }
  }
  createTask() {
    this.taskService
      .createTask<ApiResponse>(new Task(this.taskForm.value))
      .subscribe({
        next: (response) => {
          this.operationSucceded(response);
        },
        error: (error) => {
          this.errorDisplay.errorOcurred(error);
          this.onCancel();
        },
      });
  }
  operationSucceded(response:ApiResponse)
  {
    this.taskService.isLoading$.next(false);
          if (response.status == message.Success) {
            const url = this.router.url.split('/').pop();
            if (url) {
              this.taskService.pageManiulated$.next(url);
              }
            this.toaster.success(response.message);
          } else if (response.status == message.Failure) {
            this.toaster.warning(response.message);
          }
          this.onCancel();
  }
  editTask() {
    var t: Task = new Task(this.taskForm.value);
    t.id = this.editableTask.id;
    t.statusid = this.editableTask.statusid;
    t.createdon = this.editableTask.createdon;
    this.taskService.updateTask<ApiResponse>(t).subscribe({
      next: (response) => {
        this.operationSucceded(response);
      },
      error: (error) => {
        this.errorDisplay.errorOcurred(error);
        this.onCancel();
      },
    });
  }
  ngOnDestroy() {
    this.editTaskSubscribtion.unsubscribe();
  }
}
