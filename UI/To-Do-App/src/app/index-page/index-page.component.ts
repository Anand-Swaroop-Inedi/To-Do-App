import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-page',
  standalone: true,
  imports: [],
  templateUrl: './index-page.component.html',
  styleUrl: './index-page.component.scss'
})
export class IndexPageComponent implements OnInit {
  constructor(private router:Router)
  {}
  ngOnInit()
  {
    setTimeout(()=>{ this.router.navigate(['/login']);},3000);
  }
}
