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
  pageManiulated$:Subject<string>;
  editTask$: Subject<Task>;
  isLoading$:Subject<boolean>;
  deleteConfirm$:Subject<number>;
  constructor(private apiUrls: WebApiUrls, private http: HttpClient) {
    this.taskData$ = new Subject<Task[]>();
    this.editTask$ = new Subject<Task>();
    this.isLoading$=new Subject<boolean>();
    this.deleteConfirm$=new Subject<number>();
    this.pageManiulated$=new Subject<string>();
  }
}
