import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastLoginComponent } from './last-login.component';

describe('LastLoginComponent', () => {
  let component: LastLoginComponent;
  let fixture: ComponentFixture<LastLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
