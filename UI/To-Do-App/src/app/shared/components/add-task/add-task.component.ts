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
import { WebApiUrls } from '../../end-points/WebApiUrls';
import { GenericService } from '../../../services/generic/generic.service';
import { ApiResponse } from '../../../models/ApiResponse';
@Component({
  selector: 'app-add-task',
  standalone: true,
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
  imports: [ReactiveFormsModule, CommonModule, ErrorComponent],
})
export class AddTaskComponent {
  @Output() close: EventEmitter<number> = new EventEmitter<number>();
  addedTasksCount: number = 0;
  taskForm!: FormGroup;
  isSubmitted: boolean = false;
  isEdit: boolean = false;
  editableTask!: Task;
  requiredMessage: string = 'This Field is Required';
  constructor(
    private taskService: TaskService,
    private router: Router,
    private toaster: ToastrService,
    private apiUrls: WebApiUrls,
    private genericService: GenericService
  ) {}
  ngOnInit() {
    this.taskService.editTask$.subscribe((value) => {
      this.taskForm.patchValue({
        name: value.name,
        description: value.description,
      });
      this.editableTask = value;
      this.isEdit = true;
    });
    this.taskForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }
  onCancel() {
    let control: AbstractControl;
    this.taskForm.reset();
    this.taskForm.markAsUntouched();
    Object.keys(this.taskForm.controls).forEach((name) => {
      control = this.taskForm.controls[name];
      control.setErrors(null);
    });
    this.close.emit(this.addedTasksCount);
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.taskForm.valid) {
      this.taskService.isLoading$.next(true);
      if (!this.isEdit) {
        this.genericService.post<ApiResponse>(this.apiUrls.createTask,new Task(this.taskForm.value)).subscribe((response) => {
          if (response.statusCode == 200) {
            this.addedTasksCount += 1;
            this.toaster.success(response.message);
            setTimeout(() => {
              this.onCancel();
              this.taskService.isLoading$.next(false);
            }, 2000);
          } else if (response.statusCode == 400) {
            this.addedTasksCount += 1;
            this.toaster.warning(response.message);
            setTimeout(() => {
              this.onCancel();
              this.taskService.isLoading$.next(false);
            }, 2000);
          } else {
            this.toaster.error(response.message);
            this.taskService.isLoading$.next(false);
          }
        });
      } else {
        var t: Task = new Task(this.taskForm.value);
        t.id = this.editableTask.id;
        t.statusid = this.editableTask.statusid;
        t.createdon=this.editableTask.createdon;
        this.genericService.put<ApiResponse>(this.apiUrls.updateTask,t).subscribe((response) => {

          if (response.statusCode == 200) {
            this.addedTasksCount += 1;
            this.toaster.success(response.message);
            setTimeout(() => {
              this.onCancel();
              this.taskService.isLoading$.next(false);
            }, 2000);
          } else {
            this.toaster.error(response.message);
            this.taskService.isLoading$.next(false);
          }
        });
      }
    }
  }
}
