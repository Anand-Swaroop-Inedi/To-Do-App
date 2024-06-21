import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  Event as NavigationEvent,
} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-bar-mobile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './side-bar-mobile.component.html',
  styleUrl: './side-bar-mobile.component.scss',
})
export class SideBarMobileComponent implements AfterViewInit {
  @Output() name: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('menu') selectMenu!: ElementRef<HTMLInputElement>;
  subscription!: Subscription;
  constructor(private router: Router) {}
  ngAfterViewInit(): void {
    const url: any = this.router.url.split('/').pop();
    if (url) this.selectMenu.nativeElement.value = url;
    this.subscription = this.router.events.subscribe(
      (event: NavigationEvent) => {
        if (event instanceof NavigationEnd) {
          const url: any = this.router.url.split('/').pop();
          if (url) this.selectMenu.nativeElement.value = url;
        }
      }
    );
  }
  select(pageName: string) {
    this.name.emit(pageName);
    if (pageName == 'dashboard') {
      this.router.navigateByUrl('/home/dashboard');
    } else if (pageName == 'active') {
      this.router.navigateByUrl('/home/active');
    } else {
      this.router.navigateByUrl('/home/completed');
    }
  }
}
