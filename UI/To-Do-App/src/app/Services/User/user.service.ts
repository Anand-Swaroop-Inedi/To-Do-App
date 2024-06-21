import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/ApiResponse';
import { WebApiUrls } from '../../shared/end-points/WebApiUrls';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private apiUrls: WebApiUrls) {}
  authenticateUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrls.authenticateUser, user);
  }
  addUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrls.addUser, user);
  }
}
