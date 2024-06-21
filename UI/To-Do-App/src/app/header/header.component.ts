import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router, NavigationEnd, Event as NavigationEvent, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { debug } from 'console';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: []
})
export class HeaderComponent {
  @Output() flag:EventEmitter<null>=new EventEmitter<null>();
  pageName:string='';
  subscription!: Subscription;
  constructor(private router:Router)
  {

  }
  ngOnInit()
  {
    let name = this.router.url.split('/').pop();
    if(name)
    this.pageName=name[0].toUpperCase()+name.slice(1);
    this.subscription = this.router.events.subscribe((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        let name = event.urlAfterRedirects.split('/').pop();;
        if(name)
        this.pageName=name[0].toUpperCase()+name.slice(1);
      }
    });
  }
  onSignOut()
  {
    sessionStorage.removeItem('Token');
    this.router.navigate(['/']);
  }
  sendAddTaskRequest()
    {
        this.flag.emit();
    }
  OnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
