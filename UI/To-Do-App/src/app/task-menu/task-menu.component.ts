import { Component } from '@angular/core';
import { TodayDateComponent } from "../today-date/today-date.component";

@Component({
    selector: 'app-task-menu',
    standalone: true,
    templateUrl: './task-menu.component.html',
    styleUrl: './task-menu.component.scss',
    imports: [TodayDateComponent]
})
export class TaskMenuComponent {
    makeCheck(index:number)
    {
        var divRef=document.getElementsByClassName('task-item')[index] as HTMLDivElement;
        divRef.style.backgroundColor=divRef.style.backgroundColor=="white" || divRef.style.backgroundColor==""?"#EDB046":"white";
        var checkBoxRef=document.getElementsByClassName('check-box')[index] as HTMLInputElement;
        checkBoxRef.src=checkBoxRef.src.substring(checkBoxRef.src.lastIndexOf('/'))==='/unchecked-box.png'?'../../assets/checked-box.png':'../../assets/unchecked-box.png'
        var taskDetail=document.getElementsByClassName('task-item-info')[index] as HTMLInputElement;
        console.log(taskDetail.style.display);
        taskDetail.style.display=taskDetail.style.display=='None' ||taskDetail.style.display==""?'flex':'None';
        debugger;
    }
    
}
