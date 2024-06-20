import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../Models/User';
import { ApiResponse } from '../../Models/ApiResponse';
import { WebApiUrls } from '../../Api Urls/WebApiUrls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private apiUrls:WebApiUrls) { }
  authenticateUser(user:User):Observable<ApiResponse>
  {
    return this.http.post<ApiResponse>(this.apiUrls.authenticateUser, user);
  } 
  addUser(user:User):Observable<ApiResponse>
  {
    return this.http.post<ApiResponse>(this.apiUrls.addUser, user);
  } 
}
