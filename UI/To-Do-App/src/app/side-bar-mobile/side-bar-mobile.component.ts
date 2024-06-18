import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar-mobile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './side-bar-mobile.component.html',
  styleUrl: './side-bar-mobile.component.scss'
})
export class SideBarMobileComponent {
  @Output() name:EventEmitter<string>=new EventEmitter<string>()
  constructor(private router:Router)
  {
    
  }
  select(pageName:string)
  {
      console.log(pageName);
      this.name.emit(pageName);
      if(pageName=='dashboard')
      {
        this.router.navigateByUrl("/home/dashboard");
      }
      else if(pageName=='active')
      {
        this.router.navigateByUrl("/home/active");
      }
      else{
        this.router.navigateByUrl("/home/completed");
      }
  }
}
