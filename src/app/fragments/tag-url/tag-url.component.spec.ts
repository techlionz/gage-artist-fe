import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagUrlComponent } from './tag-url.component';

describe('TagUrlComponent', () => {
  let component: TagUrlComponent;
  let fixture: ComponentFixture<TagUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagUrlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
