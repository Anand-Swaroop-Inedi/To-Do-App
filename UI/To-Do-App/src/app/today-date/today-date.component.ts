import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-today-date',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './today-date.component.html',
  styleUrl: './today-date.component.scss'
})
export class TodayDateComponent {
    today:Date;
    constructor()
    {
        this.today = new Date();
    }
}
