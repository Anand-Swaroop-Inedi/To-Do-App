import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebApiUrls {
  createTask: string;
  deleteTask: string;
  updateTask: string;
  getAllTasks: string;
  getActiveTasks: string;
  getCompletedTasks: string;
  deleteAllTasks: string;
  getCompletionPercentage: string;
  makeCompleted: string;
  authenticateUser: string;
  addUser: string;
  makeActive: string;
  constructor() {
    this.getAllTasks = 'https://localhost:7064/api/Item/all';
    this.createTask = 'https://localhost:7064/api/Item/create';
    this.deleteTask = 'https://localhost:7064/api/Item/delete?id=';
    this.updateTask = 'https://localhost:7064/api/Item/update';
    this.getActiveTasks = 'https://localhost:7064/api/Item/active-items';
    this.getCompletedTasks = 'https://localhost:7064/api/Item/completed-items';
    this.deleteAllTasks = 'https://localhost:7064/api/Item/delete-all';
    this.getCompletionPercentage =
      'https://localhost:7064/api/Item/completion-percentage';
    this.makeCompleted = 'https://localhost:7064/api/Item/completed';
    this.makeActive = 'https://localhost:7064/api/Item/active';
    this.authenticateUser = 'https://localhost:7064/api/User/authenticate';
    this.addUser = 'https://localhost:7064/api/User/add';
  }
}
