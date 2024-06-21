import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredErrorComponent } from './required-error.component';

describe('RequiredErrorComponent', () => {
  let component: RequiredErrorComponent;
  let fixture: ComponentFixture<RequiredErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequiredErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RequiredErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
