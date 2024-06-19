import { Component, Input } from '@angular/core';
import { AddTaskButtonComponent } from '../add-task-button/add-task-button.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [AddTaskButtonComponent]
})
export class HeaderComponent {
  @Input() pageName:string='dashboard';
  constructor(private router:Router)
  {

  }
  ngOnInit()
  {
      let pgName:string|undefined=this.router.url.split('/').pop();
      if(pgName)
      this.pageName=pgName[0].toUpperCase()+pgName.slice(1);
  }
}
