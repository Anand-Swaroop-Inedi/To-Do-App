import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodayDateComponent } from './today-date.component';

describe('TodayDateComponent', () => {
  let component: TodayDateComponent;
  let fixture: ComponentFixture<TodayDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodayDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodayDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
