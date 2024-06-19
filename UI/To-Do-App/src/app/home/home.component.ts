import { Component, ElementRef, ViewChild } from '@angular/core';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { HeaderComponent } from "../header/header.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { SideBarMobileComponent } from "../side-bar-mobile/side-bar-mobile.component";
import { RouterModule } from '@angular/router';
import { AddTaskComponent } from "../add-task/add-task.component";
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [SideBarComponent, HeaderComponent, DashboardComponent, SideBarMobileComponent, RouterModule, AddTaskComponent]
})
export class HomeComponent {
    pageName:string='Dashboard';
    @ViewChild('addTask') addTaskRef!:ElementRef<HTMLInputElement>
    @ViewChild('home') homeDivRef!:ElementRef<HTMLInputElement>
    setPageName(name:string)
    {
        console.log(name)
        this.pageName=name;
    }
    openAddTaskContainer()
    {
        this.addTaskRef.nativeElement.style.display='block';
        this.homeDivRef.nativeElement.classList.add('blur');
    }
    closeAddTaskContainer()
    {
        this.addTaskRef.nativeElement.style.display='none';
        this.homeDivRef.nativeElement.classList.remove('blur');
    }
}
