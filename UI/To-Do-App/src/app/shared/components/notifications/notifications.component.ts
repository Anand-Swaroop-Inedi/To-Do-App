import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Task } from '../../../models/Task';
import { TaskService } from '../../../services/task/task.service';
import { ApiResponse } from '../../../models/ApiResponse';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  notifications:string[]=[];
  displayMenu:boolean=false;
  constructor(private taskService:TaskService)
  {
  }
  ngOnInit()
  {
    this.addNewNotifications()
    this.getTodaysPendingTask();
  }
  getTodaysPendingTask()
  {
    this.taskService.getNotifyTasks<ApiResponse>().subscribe((value:ApiResponse)=>{
      for(let i=0;i<value.result.length;i++)
      this.notifications.push(value.result[i].name);
      debugger;
    })
  }
  displayNotifications()
  {
    if(this.notifications.length!=0)
    this.displayMenu=this.displayMenu?false:true;
  }
  addNewNotifications()
  {
    this.taskService.notificationMessage$.subscribe((value)=>{
      if(value[1]=='add' && this.notifications.indexOf(value[0])==-1)
      this.notifications.push(value[0]);
    else if(value[1]=='del' && this.notifications.indexOf(value[0])!=-1){
      this.notifications=this.notifications.filter((item)=>item!=value[0]);
    }
    })
  }
  onCancelMenu()
  {
    this.displayMenu=false
  }
  onCancelTask(input:string)
  {
    this.notifications=this.notifications.filter((item)=>item!=input);
    if(this.notifications.length==0)
      {
        this.displayMenu=false;
      }
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = (event.target as HTMLElement).closest(
      '.notifation-container,.notification-menu'
    );
    if (!clickedInside) {
      this.displayMenu=false;
    }
  }
}
