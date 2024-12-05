import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOffcanvasComponent } from './task-offcanvas.component';

describe('TaskOffcanvasComponent', () => {
  let component: TaskOffcanvasComponent;
  let fixture: ComponentFixture<TaskOffcanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskOffcanvasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskOffcanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
