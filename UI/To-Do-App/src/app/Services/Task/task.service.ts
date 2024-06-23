import { Injectable } from '@angular/core';
import { WebApiUrls } from '../../shared/end-points/WebApiUrls';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../models/ApiResponse';
import { Observable, Subject } from 'rxjs';
import { Task } from '../../models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  taskData$: Subject<Task[]>;
  isDashboardManipulted$: Subject<boolean>;
  editTask$: Subject<Task>;
  isLoading$:Subject<boolean>;
  constructor(private apiUrls: WebApiUrls, private http: HttpClient) {
    this.taskData$ = new Subject<Task[]>();
    this.isDashboardManipulted$ = new Subject<boolean>();
    this.editTask$ = new Subject<Task>();
    this.isLoading$=new Subject<boolean>();
  }
}
