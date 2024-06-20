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
  @Output() close:EventEmitter<number>=new EventEmitter<number>();
  addedTasksCount:number=0;
  successMessage:string='';
  dangerMessage:string='';
  taskForm!:FormGroup;
  isSubmitted:boolean=false;
  isEdit:boolean=false;
  editableTask!:Task;
  constructor(private taskService:TaskService,private router:Router)
  {

  }
  ngOnInit()
  {
    this.taskService.editTask$.subscribe((value)=>{
      this.taskForm.patchValue({
        name:value.name,
        description:value.description
      });
      this.editableTask=value;
      this.isEdit=true;
    })
    this.taskForm=new FormGroup({
        name:new FormControl('',[Validators.required]),
        description:new FormControl('',[Validators.required])
    });
  }
  onCancel()
  {
    this.taskForm.reset();
    this.successMessage="";
    this.dangerMessage="";
    this.close.emit(this.addedTasksCount);
  }
  onSubmit()
  {
    this.isSubmitted=true;
    if(this.taskForm.valid)
    {
      if(!this.isEdit)
      {
      this.taskService.createTask(new Task(this.taskForm.value)).subscribe((response)=>{
        if(response.statusCode==200)
        {
          this.addedTasksCount+=1;
           this.successMessage=response.message;
           this.dangerMessage="";
           setTimeout(()=>{
            this.onCancel();
           },2000); 
        }
        else{
          this.dangerMessage=response.message;
          this.successMessage="";
        }
      });
    }
    else{
      var t:Task=new Task(this.taskForm.value);
      t.id=this.editableTask.id;
      t.statusid=this.editableTask.statusid;
      debugger
      this.taskService.updateTask(t).subscribe((response)=>{
        if(response.statusCode==200)
        {
          this.addedTasksCount+=1;
           this.successMessage=response.message;
           this.dangerMessage="";
           setTimeout(()=>{
            this.onCancel();
           },2000); 
        }
        else{
          this.dangerMessage=response.message;
          this.successMessage="";
        }
      });
    }
    }

  }
}
