import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequiredErrorComponent } from "../required-error/required-error.component";
import { TaskService } from '../Services/Task/task.service';
import { Task } from '../Models/Task';
import { Route, Router } from '@angular/router';
@Component({
    selector: 'app-add-task',
    standalone: true,
    templateUrl: './add-task.component.html',
    styleUrl: './add-task.component.scss',
    imports: [ReactiveFormsModule, CommonModule, RequiredErrorComponent]
})
export class AddTaskComponent {
  @Output() close:EventEmitter<null>=new EventEmitter<null>();
  successMessage:string='';
  dangerMessage:string='';
  taskForm!:FormGroup;
  isSubmitted:boolean=false;
  constructor(private taskService:TaskService,private router:Router)
  {

  }
  ngOnInit()
  {
    this.taskForm=new FormGroup({
        name:new FormControl('',[Validators.required]),
        description:new FormControl('',[Validators.required])
    });
  }
  onCancel()
  {
    this.taskForm.reset();
    this.successMessage=""
    this.dangerMessage=""
      this.close.emit();
  }
  onSubmit()
  {
    this.isSubmitted=true;
    if(this.taskForm.valid)
    {
      this.taskService.createTask(new Task(this.taskForm.value)).subscribe((response)=>{
        if(response.statusCode==200)
        {
           this.successMessage=response.message;
           this.dangerMessage=""
        }
        else{
          this.dangerMessage=response.message;
          this.successMessage="";
        }
        this.taskForm.reset();
      })
    }

  }
}
