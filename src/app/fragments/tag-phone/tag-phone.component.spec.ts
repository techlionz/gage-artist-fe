import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagPhoneComponent } from './tag-phone.component';

describe('TagPhoneComponent', () => {
  let component: TagPhoneComponent;
  let fixture: ComponentFixture<TagPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagPhoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
