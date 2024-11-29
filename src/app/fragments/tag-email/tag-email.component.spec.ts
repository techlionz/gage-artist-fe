import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagEmailComponent } from './tag-email.component';

describe('TagEmailComponent', () => {
  let component: TagEmailComponent;
  let fixture: ComponentFixture<TagEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
